import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs-extra';
import frontMatter from 'front-matter';

const REPORTER_PREFIX = 'onPostBuild:transpileMdxToMarkdown';

/**
 * Get the display name for a language identifier
 * Capitalizes the first letter of each word (e.g. javascript -> Javascript)
 * Handles underscore-separated variants (e.g., realtime_javascript -> Realtime Javascript, rest_javascript -> Rest Javascript)
 */
function getLanguageDisplayName(lang: string): string {
  if (!lang) {
    return '';
  }
  // Split by underscore, capitalize each part, join with space
  return lang
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/**
 * Find the heading level of the nearest preceding heading before a given position.
 * Used to determine the appropriate subheading level for code block language labels.
 * Uses splitByCodeBlocks to avoid matching # comment lines inside fenced code blocks.
 */
function findPrecedingHeadingLevel(content: string, position: number): number {
  const contentBefore = content.substring(0, position);
  const headingRegex = /^(#+)\s+/gm;
  let lastHeadingLevel = 3; // Defaults to 3 when no heading is found

  // Only scan non-code-block content to avoid matching # comments in code
  const parts = splitByCodeBlocks(contentBefore);
  for (const part of parts) {
    if (!part.isCodeBlock) {
      let match;
      while ((match = headingRegex.exec(part.content)) !== null) {
        lastHeadingLevel = match[1].length;
      }
    }
  }

  return lastHeadingLevel;
}

/**
 * Transform code blocks within a <Code> tag by adding language subheadings
 * and removing language identifiers from fenced code blocks.
 * Returns null if no code blocks with language identifiers are found.
 */
function transformCodeBlocksWithSubheadings(innerContent: string, headingPrefix: string): string | null {
  // Match ```language followed by code and closing ```
  // Uses [^\n`]+ to capture language identifiers with hyphens, plus signs, dots (e.g., objective-c, c++, shell-session)
  // Supports both Unix (\n) and Windows (\r\n) line endings
  const codeBlockRegex = /```([^\n`]+)\r?\n([\s\S]*?)```/g;

  // Check if there are any code blocks with language identifiers
  if (!innerContent.match(codeBlockRegex)) {
    return null;
  }

  // Replace each code block with a subheading followed by the code block (without language in fence)
  return innerContent.replace(codeBlockRegex, (_codeBlock, langWithMeta, codeContent) => {
    // Strip any meta string (e.g. highlight="2,8") from the language identifier
    const lang = langWithMeta.split(/\s+/)[0];
    const displayName = getLanguageDisplayName(lang);
    return `${headingPrefix} ${displayName}\n\n\`\`\`\n${codeContent}\`\`\``;
  });
}

/**
 * Add language subheadings before each code block within <Code> tags.
 * This makes it easier for LLMs to identify which language each code snippet belongs to.
 * - Removes language identifier from fenced code blocks (since subheading provides this info)
 * - Dynamically determines heading level based on preceding heading context
 */
function addLanguageSubheadingsToCodeBlocks(content: string): string {
  // Match <Code> blocks with optional attributes (case-insensitive for the tag)
  // Handles both <Code> and <Code fixed="true"> etc.
  const codeTagRegex = /<Code\b[^>]*>([\s\S]*?)<\/Code>/gi;

  return content.replace(codeTagRegex, (fullMatch, innerContent: string, offset: number) => {
    // Calculate the appropriate heading level based on preceding headings
    const precedingLevel = findPrecedingHeadingLevel(content, offset);
    const headingPrefix = '#'.repeat(precedingLevel + 1);

    // Transform code blocks with subheadings
    const transformedContent = transformCodeBlocksWithSubheadings(innerContent, headingPrefix);
    if (transformedContent === null) {
      return fullMatch; // No code blocks with language - return unchanged
    }

    // Ensure proper newline after <Code> tag for markdown formatting
    return `<Code>\n\n${transformedContent.trimStart()}</Code>`;
  });
}

/**
 * Strip code fence meta strings (e.g. highlight="2,8") from all fenced code blocks,
 * keeping only the language identifier. This keeps the compiled markdown clean for LLMs.
 */
function stripCodeFenceMeta(content: string): string {
  // Match opening code fences with a language followed by whitespace and meta
  return content.replace(/```(\S+)[ \t]+[^\n]+/g, '```$1');
}

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
 * Split content into code block and non-code-block sections
 * Used to preserve code blocks during content transformations
 */
function splitByCodeBlocks(content: string): Array<{ content: string; isCodeBlock: boolean }> {
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

  return parts;
}

/**
 * Apply a transformation function only to non-code-block content
 * Preserves fenced code blocks (``` ... ```) exactly as-is
 */
function transformNonCodeBlocks(content: string, transform: (text: string) => string): string {
  return splitByCodeBlocks(content)
    .map((part) => (part.isCodeBlock ? part.content : transform(part.content)))
    .join('');
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
  return transformNonCodeBlocks(content, (text) => text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ''));
}

/**
 * Remove anchor tags that are used for HTML navigation
 * Removes patterns like <a id="foo"/>, <a name="bar"></a>, etc.
 * Preserves actual links with href attributes
 */
function removeAnchorTags(content: string): string {
  return transformNonCodeBlocks(content, (text) =>
    text
      .replace(/<a\s+id="[^"]*"\s*\/>/gi, '')
      .replace(/<a\s+name="[^"]*"\s*\/>/gi, '')
      .replace(/<a\s+id="[^"]*"\s*><\/a>/gi, '')
      .replace(/<a\s+name="[^"]*"\s*><\/a>/gi, ''),
  );
}

/**
 * Strip the hidden attribute from Table components
 * Converts: <Table id="TypeName" hidden> → <Table id="TypeName">
 * This makes hidden type definition tables visible in markdown output
 */
function stripHiddenFromTables(content: string): string {
  return transformNonCodeBlocks(content, (text) => text.replace(/(<Table\s+[^>]*)\bhidden\b\s*/gi, '$1'));
}

/**
 * Remove JSX comments from content
 * Removes patterns like: {slash-star comment star-slash}
 * Preserves JSX comments in code blocks
 */
function removeJsxComments(content: string): string {
  return transformNonCodeBlocks(content, (text) => text.replace(/\{\/\*[\s\S]*?\*\/\}/g, ''));
}

/**
 * Convert MethodSignature components to inline code
 * Handles both simple content and template literal syntax
 * <MethodSignature>content</MethodSignature> → `content`
 * <MethodSignature>{`content`}</MethodSignature> → `content`
 */
function convertMethodSignatureToCode(content: string): string {
  return transformNonCodeBlocks(content, (text) =>
    text
      // Template literal syntax: <MethodSignature>{`content`}</MethodSignature>
      .replace(/<MethodSignature>\{`([^`]*)`\}<\/MethodSignature>/g, '`$1`')
      // Simple syntax: <MethodSignature>content</MethodSignature>
      .replace(/<MethodSignature>([^<{]+)<\/MethodSignature>/g, '`$1`'),
  );
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
 * Convert Ably /docs/ links to use .md extension and remove ?lang= query parameters
 * This is needed for LLM-friendly markdown files where all links should point to .md files
 * Converts: [text](https://ably.com/docs/channels?lang=javascript) → [text](https://ably.com/docs/channels.md)
 * Preserves: Non-Ably /docs/ links, sdk.ably.com links (API docs), already .md links
 */
function convertDocsLinksToMarkdown(content: string): string {
  // Allowed hostnames for docs link conversion (exact matches only)
  const ALLOWED_DOCS_HOSTNAMES = ['ably.com', 'www.ably.com', 'ably-dev.com', 'www.ably-dev.com'];

  // Match markdown links: [text](url)
  return content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    // Only process absolute URLs with http/https
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return match;
    }

    // Parse the URL to properly validate the host
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(url);
    } catch {
      // Invalid URL, return as-is
      return match;
    }

    // Only process URLs from allowed Ably domains (ably.com, www.ably.com, ably-dev.com, www.ably-dev.com)
    if (!ALLOWED_DOCS_HOSTNAMES.includes(parsedUrl.hostname)) {
      return match;
    }

    // Only process /docs/ paths
    if (!parsedUrl.pathname.startsWith('/docs/')) {
      return match;
    }

    // Don't process if already has .md extension
    if (parsedUrl.pathname.match(/\.md$/)) {
      return match;
    }

    // Don't add .md if URL already has a file extension (e.g., .png, .jpg, .html, .pdf, etc.)
    // This prevents converting image/file URLs like test.png to test.png.md
    if (parsedUrl.pathname.match(/\.[a-zA-Z0-9]{2,5}$/)) {
      return match;
    }

    // Normalize the path: remove trailing slash before adding .md
    let normalizedPath = parsedUrl.pathname;
    if (normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    // Build the new URL with .md extension
    // Remove query parameters (including ?lang=) but preserve hash for semantic context
    const newUrl = `${parsedUrl.protocol}//${parsedUrl.host}${normalizedPath}.md${parsedUrl.hash}`;

    return `[${linkText}](${newUrl})`;
  });
}

/**
 * Generate a readable link text from a /docs/ URL path
 * Converts: /docs/chat/getting-started/javascript → ably docs chat getting-started javascript
 * Note: This function expects paths starting with /docs/
 */
function generateLinkTextFromPath(urlPath: string): string {
  // Remove leading /docs/ (or /docs) and split by /
  const pathWithoutDocs = urlPath.replace(/^\/docs(?:\/|$)/, '');
  // Filter out empty parts to handle trailing slashes
  const parts = pathWithoutDocs.split('/').filter(Boolean);
  return parts.length ? `ably docs ${parts.join(' ')}` : 'ably docs';
}

/**
 * Convert quoted strings containing relative /docs/ URLs to markdown links with absolute URLs
 * Converts: '/docs/chat/getting-started/javascript' → '[ably docs chat getting-started javascript](https://ably.com/docs/chat/getting-started/javascript)'
 * Matches any quoted string starting with /docs/ (single or double quotes)
 * This handles JSX props like link: '/docs/...' as well as other contexts
 * Preserves code blocks - does not transform /docs/ paths inside fenced code blocks
 */
function convertJsxLinkProps(content: string, siteUrl: string): string {
  const baseUrl = siteUrl.replace(/\/$/, ''); // Remove trailing slash

  return transformNonCodeBlocks(content, (text) =>
    // Matches any quoted string starting with /docs/: '/docs/...' or "/docs/..."
    text.replace(/(['"])(\/docs\/[^'"]+)\1/g, (match, quote, url) => {
      const absoluteUrl = `${baseUrl}${url}`;
      const linkText = generateLinkTextFromPath(url);
      return `${quote}[${linkText}](${absoluteUrl})${quote}`;
    }),
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

  // Stage 6: Convert MethodSignature components to inline code
  content = convertMethodSignatureToCode(content);

  // Stage 7: Strip hidden attribute from tables (makes them visible in markdown)
  content = stripHiddenFromTables(content);

  // Stage 8: Convert image paths to GitHub URLs
  content = convertImagePathsToGitHub(content);

  // Stage 9: Convert relative URLs to absolute URLs
  content = convertRelativeUrls(content, siteUrl);

  // Stage 10: Convert quoted /docs/ URLs to markdown links (for JSX props like link: '/docs/...')
  content = convertJsxLinkProps(content, siteUrl);

  // Stage 11: Convert /docs/ links to .md extension and remove ?lang= params
  content = convertDocsLinksToMarkdown(content);

  // Stage 12: Replace template variables
  content = replaceTemplateVariables(content);

  // Stage 13: Strip code fence meta strings (e.g. highlight="2,8") to keep markdown clean for LLMs
  content = stripCodeFenceMeta(content);

  // Stage 14: Add language subheadings to code blocks within <Code> tags
  content = addLanguageSubheadingsToCodeBlocks(content);

  // Stage 15: Prepend title as markdown heading
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
  convertMethodSignatureToCode,
  stripHiddenFromTables,
  convertImagePathsToGitHub,
  convertDocsLinksToMarkdown,
  convertJsxLinkProps,
  generateLinkTextFromPath,
  convertRelativeUrls,
  replaceTemplateVariables,
  calculateOutputPath,
  transformMdxToMarkdown,
  getLanguageDisplayName,
  findPrecedingHeadingLevel,
  transformCodeBlocksWithSubheadings,
  addLanguageSubheadingsToCodeBlocks,
  stripCodeFenceMeta,
};
