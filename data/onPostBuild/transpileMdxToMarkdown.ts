import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs-extra';
import frontMatter from 'front-matter';

const REPORTER_PREFIX = 'onPostBuild:transpileMdxToMarkdown';

interface MdxNode {
  parent: {
    relativeDirectory: string;
    name: string;
    absolutePath: string;
  };
  internal: {
    contentFilePath: string;
  };
}

interface MdxQueryResult {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
  allMdx: {
    nodes: MdxNode[];
  };
}

interface FrontMatterAttributes {
  title?: string;
  [key: string]: any;
}

/**
 * Remove import and export statements from content
 * Handles both single-line and multi-line statements
 */
function removeImportExportStatements(content: string): string {
  return (
    content
      // Remove import statements (single and multi-line)
      .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
      .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '')
      // Remove export statements (single and multi-line)
      .replace(/^export\s+\{[\s\S]*?\}\s*;?\s*$/gm, '')
      .replace(/^export\s+\{[\s\S]*?\}\s+from\s+['"][^'"]+['"];?\s*$/gm, '')
      .replace(/^export\s+(default|const|let|var|function|class)\s+.*$/gm, '')
      // Clean up extra blank lines left behind
      .replace(/\n\n\n+/g, '\n\n')
  );
}

/**
 * Remove script tags that are not inside code blocks
 */
function removeScriptTags(content: string): string {
  // Split content into code block and non-code-block sections
  const parts: Array<{ content: string; isCodeBlock: boolean }> = [];
  const fenceRegex = /```[\s\S]*?```/g;

  let lastIndex = 0;
  const matches = Array.from(content.matchAll(fenceRegex));

  for (const match of matches) {
    // Add content before code block
    if (match.index !== undefined && match.index > lastIndex) {
      parts.push({
        content: content.slice(lastIndex, match.index),
        isCodeBlock: false,
      });
    }
    // Add code block itself
    parts.push({
      content: match[0],
      isCodeBlock: true,
    });
    lastIndex = (match.index || 0) + match[0].length;
  }

  // Add remaining content after last code block
  if (lastIndex < content.length) {
    parts.push({
      content: content.slice(lastIndex),
      isCodeBlock: false,
    });
  }

  // Remove script tags only from non-code-block parts
  return parts
    .map((part) => {
      if (part.isCodeBlock) {
        return part.content; // Preserve code blocks exactly
      }
      // Remove script tags with any attributes and their content
      return part.content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    })
    .join('');
}

/**
 * Remove anchor tags that are used for HTML navigation
 * Removes patterns like <a id="foo"/>, <a name="bar"></a>, etc.
 * Preserves actual links with href attributes
 */
function removeAnchorTags(content: string): string {
  // Split content into code block and non-code-block sections
  const parts: Array<{ content: string; isCodeBlock: boolean }> = [];
  const fenceRegex = /```[\s\S]*?```/g;

  let lastIndex = 0;
  const matches = Array.from(content.matchAll(fenceRegex));

  for (const match of matches) {
    if (match.index !== undefined && match.index > lastIndex) {
      parts.push({
        content: content.slice(lastIndex, match.index),
        isCodeBlock: false,
      });
    }
    parts.push({
      content: match[0],
      isCodeBlock: true,
    });
    lastIndex = (match.index || 0) + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      content: content.slice(lastIndex),
      isCodeBlock: false,
    });
  }

  // Remove anchor tags only from non-code-block parts
  return parts
    .map((part) => {
      if (part.isCodeBlock) {
        return part.content; // Preserve code blocks exactly
      }

      // Remove anchor tags from regular content
      return part.content
        .replace(/<a\s+id="[^"]*"\s*\/>/gi, '')
        .replace(/<a\s+name="[^"]*"\s*\/>/gi, '')
        .replace(/<a\s+id="[^"]*"\s*><\/a>/gi, '')
        .replace(/<a\s+name="[^"]*"\s*><\/a>/gi, '');
    })
    .join('');
}

/**
 * Remove JSX comments from content
 * Removes patterns like: {slash-star comment star-slash}
 * Preserves JSX comments in code blocks
 */
function removeJsxComments(content: string): string {
  // Split content into code block and non-code-block sections
  const parts: Array<{ content: string; isCodeBlock: boolean }> = [];
  const fenceRegex = /```[\s\S]*?```/g;

  let lastIndex = 0;
  const matches = Array.from(content.matchAll(fenceRegex));

  for (const match of matches) {
    if (match.index !== undefined && match.index > lastIndex) {
      parts.push({
        content: content.slice(lastIndex, match.index),
        isCodeBlock: false,
      });
    }
    parts.push({
      content: match[0],
      isCodeBlock: true,
    });
    lastIndex = (match.index || 0) + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({
      content: content.slice(lastIndex),
      isCodeBlock: false,
    });
  }

  // Remove JSX comments only from non-code-block parts
  return parts
    .map((part) => {
      if (part.isCodeBlock) {
        return part.content; // Preserve code blocks exactly
      }
      // Remove JSX comments from regular content
      return part.content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
    })
    .join('');
}

/**
 * Convert image paths to GitHub raw URLs
 * Handles relative (../), absolute (/images/), and direct (images/) paths
 */
function convertImagePathsToGitHub(content: string): string {
  const githubBaseUrl = 'https://raw.githubusercontent.com/ably/docs/main/src';

  // Supported image extensions
  const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'ico'];
  const imageExtPattern = imageExtensions.join('|');

  // Regex to match Markdown images with images/ path and valid image extension
  // Handles escaped brackets in alt text and parentheses in URL
  // Alt text: allows any character, including escaped brackets
  // URL: matches images/ path, allows parentheses in the path, and ends with valid extension
  const imageRegex = new RegExp(
    String.raw`!\[((?:[^\]\\]|\\.)*)\]\(((?:\.\.\/)+)?\/?(images\/(?:[^)\s]|\([^)]*\))+?\.(?:${imageExtPattern}))(?:\s+"[^"]*")?\)`,
    'g',
  );

  return content.replace(imageRegex, (match, altText, relativePath, imagePath) => {
    // Remove any leading slash from imagePath (since githubBaseUrl already ends with /src)
    const cleanImagePath = imagePath.replace(/^\/+/, '');
    return `![${altText}](${githubBaseUrl}/${cleanImagePath})`;
  });
}

/**
 * Convert relative URLs to absolute URLs using the main website domain
 * Converts: [text](/docs/channels) → [text](https://ably.com/docs/channels)
 * Preserves: External URLs (http://, https://), hash-only links (#anchor)
 */
function convertRelativeUrls(content: string, siteUrl: string): string {
  const baseUrl = siteUrl.replace(/\/$/, ''); // Remove trailing slash

  // Match markdown links: [text](url)
  // Only convert URLs that start with / (relative) and are not external URLs or hash-only
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    // Don't convert external URLs
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return match;
    }

    // Don't convert hash-only anchors
    if (url.startsWith('#')) {
      return match;
    }

    // Convert relative URLs (starting with /)
    if (url.startsWith('/')) {
      return `[${linkText}](${baseUrl}${url})`;
    }

    // Keep other URLs as-is (relative paths without leading /)
    return match;
  });
}

/**
 * Replace template variables with readable placeholders
 */
function replaceTemplateVariables(content: string): string {
  return content.replace(/{{API_KEY}}/g, 'your-api-key').replace(/{{RANDOM_CHANNEL_NAME}}/g, 'your-channel-name');
}

/**
 * Calculate the output path for a markdown file based on its source location
 */
function calculateOutputPath(relativeDirectory: string, fileName: string): string {
  // Remove 'docs' or 'docs/' prefix: "docs/channels" → "channels", "docs" → ""
  const pathWithoutDocs = relativeDirectory.replace(/^docs\/?/, '');
  const pathParts = pathWithoutDocs.split('/').filter((p) => p);

  if (fileName === 'index') {
    // Special case: top-level docs/index.mdx → public/docs.md
    if (pathParts.length === 0) {
      return path.join(process.cwd(), 'public', 'docs.md');
    }

    // index.mdx: use parent directory name
    // docs/channels/index.mdx → public/docs/channels.md
    const dirName = pathParts.pop(); // Remove and get last element
    return path.join(process.cwd(), 'public', 'docs', ...pathParts, `${dirName}.md`);
  } else {
    // Regular file: use filename
    // docs/chat/connect.mdx → public/docs/chat/connect.md
    return path.join(process.cwd(), 'public', 'docs', ...pathParts, `${fileName}.md`);
  }
}

/**
 * Transform MDX content to clean Markdown
 */
function transformMdxToMarkdown(sourceContent: string, siteUrl: string): { content: string; title: string } {
  // Stage 1: Parse frontmatter
  const parsed = frontMatter<FrontMatterAttributes>(sourceContent);

  if (!parsed.attributes.title) {
    throw new Error('Missing title in frontmatter');
  }

  const title = parsed.attributes.title;
  let content = parsed.body;

  // Stage 2: Remove import/export statements
  content = removeImportExportStatements(content);

  // Stage 3: Remove script tags (not in code blocks)
  content = removeScriptTags(content);

  // Stage 4: Remove anchor tags
  content = removeAnchorTags(content);

  // Stage 5: Remove JSX comments
  content = removeJsxComments(content);

  // Stage 6: Convert image paths to GitHub URLs
  content = convertImagePathsToGitHub(content);

  // Stage 7: Convert relative URLs to absolute URLs
  content = convertRelativeUrls(content, siteUrl);

  // Stage 8: Replace template variables
  content = replaceTemplateVariables(content);

  // Stage 9: Prepend title as markdown heading
  const finalContent = `# ${title}\n\n${content}`;

  return { content: finalContent, title };
}

/**
 * Process a single MDX file
 */
async function processFile(node: MdxNode, siteUrl: string, reporter: any): Promise<void> {
  const sourcePath = node.internal.contentFilePath;
  const relativeDirectory = node.parent.relativeDirectory;
  const fileName = node.parent.name;

  // Read source MDX file
  const sourceContent = await fs.readFile(sourcePath, 'utf-8');

  // Transform MDX to Markdown
  const { content } = transformMdxToMarkdown(sourceContent, siteUrl);

  // Calculate output path
  const outputPath = calculateOutputPath(relativeDirectory, fileName);

  // Ensure output directory exists
  await fs.ensureDir(path.dirname(outputPath));

  // Write markdown file
  await fs.writeFile(outputPath, content, 'utf-8');

  reporter.verbose(`${REPORTER_PREFIX} Transpiled: ${sourcePath} -> ${outputPath}`);
}

/**
 * Main onPostBuild function
 */
export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter }) => {
  const query = `
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMdx {
        nodes {
          parent {
            ... on File {
              relativeDirectory
              name
              absolutePath
            }
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `;

  const { data, errors } = await graphql<MdxQueryResult>(query);

  if (errors) {
    reporter.panicOnBuild(`${REPORTER_PREFIX} Error running GraphQL query: ${JSON.stringify(errors)}`);
    return;
  }

  if (!data) {
    reporter.warn(`${REPORTER_PREFIX} No MDX nodes found`);
    return;
  }

  // Get siteUrl from GraphQL
  const siteUrl = data.site.siteMetadata.siteUrl;

  // Filter to only docs directory
  const mdxNodes = data.allMdx.nodes.filter((node) => {
    return node.parent.relativeDirectory.startsWith('docs');
  });

  reporter.info(`${REPORTER_PREFIX} Found ${mdxNodes.length} MDX files to transpile`);

  let successCount = 0;
  let failureCount = 0;

  // Process each file
  for (const node of mdxNodes) {
    try {
      await processFile(node, siteUrl, reporter);
      successCount++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      reporter.warn(`${REPORTER_PREFIX} Failed to transpile ${node.internal.contentFilePath}: ${errorMessage}`);
      failureCount++;
    }
  }

  // Report summary
  if (failureCount > 0) {
    reporter.warn(`${REPORTER_PREFIX} Transpiled ${successCount} files, ${failureCount} failed`);
  } else {
    reporter.info(`${REPORTER_PREFIX} Successfully transpiled ${successCount} MDX files to Markdown`);
  }
};

// Export functions for testing
export {
  removeImportExportStatements,
  removeScriptTags,
  removeAnchorTags,
  removeJsxComments,
  convertImagePathsToGitHub,
  convertRelativeUrls,
  replaceTemplateVariables,
  calculateOutputPath,
  transformMdxToMarkdown,
};
