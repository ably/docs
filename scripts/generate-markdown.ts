#!/usr/bin/env ts-node

/**
 * Generate static markdown files for each MDX page
 * These are served from /public/docs/*.md for the markdown copy feature
 *
 * Replicates the Gatsby onPostBuild transpileMdxToMarkdown behavior:
 * - Extracts title and intro from frontmatter (discards all other fields)
 * - Removes import/export statements
 * - Removes script tags (preserves code blocks)
 * - Removes anchor tags
 * - Removes JSX comments
 * - Converts image paths to GitHub raw URLs
 * - Converts relative URLs to absolute URLs
 * - Replaces template variables
 * - Prepends title as H1 heading
 */

import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';

const CONTENT_PATH = path.join(process.cwd(), 'src/pages/docs');
const OUTPUT_DIR = path.join(process.cwd(), 'public/docs');
const SITE_URL = 'https://ably.com';
const GITHUB_BASE_URL = 'https://raw.githubusercontent.com/ably/docs/main/src';

interface FrontMatterAttributes {
  title?: string;
  intro?: string;
  [key: string]: unknown;
}

/**
 * Remove import and export statements from content
 * Handles both single-line and multi-line statements
 */
function removeImportExportStatements(content: string): string {
  let result = content;

  // Remove import statements (single and multi-line)
  result = result
    .replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '');

  // Remove export statements
  // Handle: export { foo, bar }; (single and multi-line)
  result = result
    .replace(/^export\s+\{[\s\S]*?\}\s*;?\s*$/gm, '')
    .replace(/^export\s+\{[\s\S]*?\}\s+from\s+['"][^'"]+['"];?\s*$/gm, '');

  // Handle: export default Component; or export const foo = 'bar';
  result = result.replace(/^export\s+(default|const|let|var)\s+.*$/gm, '');

  // Handle: export function/class declarations (multi-line)
  // Match from 'export function/class' until the closing brace
  result = result.replace(/^export\s+(function|class)\s+\w+[\s\S]*?\n\}/gm, '');

  // Clean up extra blank lines left behind
  return result.replace(/\n\n\n+/g, '\n\n');
}

/**
 * Split content into code block and non-code-block sections
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
 * Remove script tags that are not inside code blocks
 */
function removeScriptTags(content: string): string {
  const parts = splitByCodeBlocks(content);

  return parts
    .map((part) => {
      if (part.isCodeBlock) {
        return part.content;
      }
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
  const parts = splitByCodeBlocks(content);

  return parts
    .map((part) => {
      if (part.isCodeBlock) {
        return part.content;
      }

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
 * Removes patterns like: {/\* comment *\/}
 * Preserves JSX comments in code blocks
 */
function removeJsxComments(content: string): string {
  const parts = splitByCodeBlocks(content);

  return parts
    .map((part) => {
      if (part.isCodeBlock) {
        return part.content;
      }
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
  const imageExtensions = '(?:png|jpg|jpeg|gif|svg|webp|bmp|ico)';

  return (
    content
      // Handle relative paths: ../../../images/...{ext}
      .replace(
        new RegExp(`!\\[([^\\]]*)\\]\\(((?:\\.\\.\\/)+)(images\\/[^)]+\\.${imageExtensions})\\)`, 'gi'),
        (match, altText, relativePath, imagePath) => {
          return `![${altText}](${GITHUB_BASE_URL}/${imagePath})`;
        },
      )
      // Handle absolute paths: /images/...{ext}
      .replace(
        new RegExp(`!\\[([^\\]]*)\\]\\(\\/(images\\/[^)]+\\.${imageExtensions})\\)`, 'gi'),
        (match, altText, imagePath) => {
          return `![${altText}](${GITHUB_BASE_URL}/${imagePath})`;
        },
      )
      // Handle direct paths: images/...{ext} (no prefix)
      .replace(
        new RegExp(`!\\[([^\\]]*)\\]\\((images\\/[^)]+\\.${imageExtensions})\\)`, 'gi'),
        (match, altText, imagePath) => {
          return `![${altText}](${GITHUB_BASE_URL}/${imagePath})`;
        },
      )
  );
}

/**
 * Convert relative URLs to absolute URLs using the main website domain
 * Converts: [text](/docs/channels) → [text](https://ably.com/docs/channels)
 * Preserves: External URLs (http://, https://), hash-only links (#anchor)
 */
function convertRelativeUrls(content: string): string {
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
      return `[${linkText}](${SITE_URL}${url})`;
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
 * Transform MDX content to clean Markdown
 */
function transformMdxToMarkdown(sourceContent: string): { content: string; title: string; intro?: string } {
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
  content = convertRelativeUrls(content);

  // Stage 8: Replace template variables
  content = replaceTemplateVariables(content);

  // Stage 9: Prepend title as markdown heading (and optional intro)
  const finalContent = `# ${title}\n\n${intro ? `${intro}\n\n` : ''}${content}`;

  return { content: finalContent, title, intro };
}

/**
 * Recursively find all MDX files in a directory
 */
function findMdxFiles(dir: string): string[] {
  const files: string[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (entry.isFile() && (entry.name.endsWith('.mdx') || entry.name.endsWith('.md'))) {
      // Skip TypeScript files
      if (!entry.name.endsWith('.tsx') && !entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Calculate the output path for a markdown file
 */
function calculateOutputPath(filePath: string): string {
  const relativePath = path.relative(CONTENT_PATH, filePath);
  const parsed = path.parse(relativePath);
  const dirParts = parsed.dir.split(path.sep).filter((p) => p);

  if (parsed.name === 'index') {
    // index.mdx: use parent directory name
    if (dirParts.length === 0) {
      // Top-level index - skip
      return '';
    }
    const dirName = dirParts.pop();
    return path.join(OUTPUT_DIR, ...dirParts, `${dirName}.md`);
  } else {
    // Regular file: use filename
    return path.join(OUTPUT_DIR, ...dirParts, `${parsed.name}.md`);
  }
}

async function generateMarkdownFiles() {
  console.log('Generating markdown files...');

  // Clean output directory - only remove .md files
  if (fs.existsSync(OUTPUT_DIR)) {
    const removeMarkdownFiles = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          removeMarkdownFiles(fullPath);
          // Remove empty directories
          if (fs.readdirSync(fullPath).length === 0) {
            fs.rmdirSync(fullPath);
          }
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          fs.unlinkSync(fullPath);
        }
      }
    };
    removeMarkdownFiles(OUTPUT_DIR);
  }

  // Ensure output directory exists
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const files = findMdxFiles(CONTENT_PATH);
  let successCount = 0;
  let failureCount = 0;

  for (const filePath of files) {
    const outputPath = calculateOutputPath(filePath);

    // Skip files without output path (like root index)
    if (!outputPath) continue;

    try {
      const sourceContent = fs.readFileSync(filePath, 'utf-8');
      const { content } = transformMdxToMarkdown(sourceContent);

      // Ensure output directory exists
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Write file
      fs.writeFileSync(outputPath, content, 'utf-8');
      successCount++;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.warn(`Failed to transpile ${filePath}: ${errorMessage}`);
      failureCount++;
    }
  }

  if (failureCount > 0) {
    console.log(`Transpiled ${successCount} files, ${failureCount} failed`);
  } else {
    console.log(`Successfully transpiled ${successCount} MDX files to Markdown in ${OUTPUT_DIR}`);
  }
}

generateMarkdownFiles().catch(console.error);
