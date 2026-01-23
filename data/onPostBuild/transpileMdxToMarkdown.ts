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
 * Uses a line-by-line parser that only removes import/export from the top of the file,
 * preserving import/export statements in code blocks later in the file
 */
function removeImportExportStatements(content: string): string {
  const lines = content.split('\n');
  const result: string[] = [];
  let isInTopImportExportSection = true;
  let inMultiLineStatement: 'none' | 'import' | 'export' | 'export-function' = 'none';
  let braceDepth = 0;

  for (const line of lines) {
    if (!isInTopImportExportSection) {
      // Once we're past the import/export section, keep everything
      result.push(line);
      continue;
    }

    const trimmed = line.trim();

    // Handle blank lines - skip them while in import/export section
    if (trimmed === '') {
      continue;
    }

    // Check if we're continuing a multi-line statement
    if (inMultiLineStatement !== 'none') {
      if (inMultiLineStatement === 'export-function' || inMultiLineStatement === 'export') {
        // For any export with braces (functions, classes, arrow functions, etc.), track brace depth
        if (braceDepth > 0) {
          // Count opening and closing braces
          const openBraces = (line.match(/\{/g) || []).length;
          const closeBraces = (line.match(/\}/g) || []).length;
          braceDepth += openBraces - closeBraces;

          // If we've closed all braces, we're done with this statement
          if (braceDepth === 0) {
            inMultiLineStatement = 'none';
          }
        } else {
          // No braces being tracked, look for semicolon or closing brace to end
          if (line.includes(';') || (line.includes('}') && !line.includes('{'))) {
            inMultiLineStatement = 'none';
          }
        }
      } else {
        // For regular import statements, look for semicolon or closing brace
        if (line.includes(';') || (line.includes('}') && !line.includes('{'))) {
          inMultiLineStatement = 'none';
        }
      }
      continue;
    }

    // Check if line starts an import statement
    if (trimmed.startsWith('import ')) {
      // Detect if it's a complete single-line import or incomplete multi-line
      const hasFrom = trimmed.includes(' from ');
      const endsWithQuote = trimmed.match(/['"][;]?\s*$/);
      const hasSemicolon = trimmed.includes(';');
      const isSideEffectImport = trimmed.match(/^import\s+['"]/);

      // Complete cases:
      // 1. Has semicolon
      // 2. Has 'from' and ends with quote (with or without semicolon)
      // 3. Is a side-effect import: import 'foo' or import "foo" (with or without semicolon)
      if (!hasSemicolon && hasFrom && !endsWithQuote) {
        // Incomplete: multi-line import like "import {" without closing
        inMultiLineStatement = 'import';
      } else if (!hasSemicolon && !hasFrom && !isSideEffectImport) {
        // Incomplete: just "import" or "import {" at start of multi-line
        // (but not side-effect imports which are complete)
        inMultiLineStatement = 'import';
      }
      // Otherwise it's complete
      continue;
    }

    // Check if line starts an export statement
    if (trimmed.startsWith('export ')) {
      // Detect export function/class (multi-line with braces)
      if (trimmed.match(/^export\s+(function|class)\s+/)) {
        inMultiLineStatement = 'export-function';
        // Count braces on this line
        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;
        braceDepth = openBraces - closeBraces;
        // Check if it's all on one line (rare but possible)
        if (braceDepth === 0 && line.includes('}')) {
          inMultiLineStatement = 'none';
        }
      } else if (!line.includes(';') && line.includes('{') && !line.includes('}')) {
        // Multi-line export with braces (arrow functions, objects, etc.)
        inMultiLineStatement = 'export';
        // Initialize brace depth tracking
        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;
        braceDepth = openBraces - closeBraces;
      }
      // Otherwise it's complete (has semicolon, or no braces)
      continue;
    }

    // First non-import/export line - we're done with the section
    isInTopImportExportSection = false;
    result.push(line);
  }

  return result.join('\n');
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
 * Only converts paths with valid image extensions
 */
function convertImagePathsToGitHub(content: string): string {
  const githubBaseUrl = 'https://raw.githubusercontent.com/ably/docs/main/src';
  const imageExtensions = '(?:png|jpg|jpeg|gif|svg|webp|bmp|ico)';

  return (
    content
      // Handle relative paths: ../../../images/...{ext}
      .replace(
        new RegExp(`!\\[([^\\]]*)\\]\\(((?:\\.\\.\\/)+)(images\\/[^)]+\\.${imageExtensions})\\)`, 'gi'),
        (match, altText, relativePath, imagePath) => {
          return `![${altText}](${githubBaseUrl}/${imagePath})`;
        },
      )
      // Handle absolute paths: /images/...{ext}
      .replace(
        new RegExp(`!\\[([^\\]]*)\\]\\(\\/(images\\/[^)]+\\.${imageExtensions})\\)`, 'gi'),
        (match, altText, imagePath) => {
          return `![${altText}](${githubBaseUrl}/${imagePath})`;
        },
      )
      // Handle direct paths: images/...{ext} (no prefix)
      .replace(
        new RegExp(`!\\[([^\\]]*)\\]\\((images\\/[^)]+\\.${imageExtensions})\\)`, 'gi'),
        (match, altText, imagePath) => {
          return `![${altText}](${githubBaseUrl}/${imagePath})`;
        },
      )
  );
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
function transformMdxToMarkdown(
  sourceContent: string,
  siteUrl: string,
): { content: string; title: string; intro?: string } {
  // Stage 1: Parse frontmatter
  const parsed = frontMatter<FrontMatterAttributes>(sourceContent);

  if (!parsed.attributes.title) {
    throw new Error('Missing title in frontmatter');
  }

  const title = parsed.attributes.title;
  const intro = parsed.attributes.intro;
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
  const finalContent = `# ${title}\n\n${intro ? `${intro}\n\n` : ''}${content}`;

  return { content: finalContent, title, intro };
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
  const siteUrl = data.site?.siteMetadata?.siteUrl;

  if (!siteUrl) {
    reporter.panicOnBuild(
      `${REPORTER_PREFIX} siteUrl is not configured in siteMetadata. Please check gatsby-config.ts`,
    );
    return;
  }

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
