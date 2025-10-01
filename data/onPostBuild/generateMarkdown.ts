import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs';
import TurndownService from 'turndown';
import cheerio from 'cheerio';
import fastGlob from 'fast-glob';

/**
 * This script generates Markdown static files alongside HTML files for each page.
 * This allows LLM crawlers and other clients to request markdown versions of pages
 * which are significantly more token-efficient than HTML.
 */

const REPORTER_PREFIX = 'generateMarkdown:';

// Constants for content validation
const REDIRECT_PAGE_MAX_SIZE = 1000; // Maximum size in bytes for redirect pages
const MIN_CONTENT_LENGTH = 100; // Minimum content length to consider meaningful

// Configure Turndown for documentation-friendly markdown
const createTurndownService = () => {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
    emDelimiter: '_',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full',
  });

  // Preserve code block language annotations
  turndownService.addRule('fencedCodeBlock', {
    filter: (node) => {
      return node.nodeName === 'PRE' && node.firstChild && node.firstChild.nodeName === 'CODE';
    },
    replacement: (content, node) => {
      const codeNode = node.firstChild as HTMLElement;
      const className = codeNode.getAttribute('class') || '';
      const languageMatch = className.match(/language-(\w+)/);
      const language = languageMatch ? languageMatch[1] : '';

      // Get the actual code content
      const code = codeNode.textContent || '';

      return '\n\n```' + language + '\n' + code + '\n```\n\n';
    },
  });

  // Remove navigation, headers, footers, and other UI elements
  turndownService.remove(['nav', 'header', 'footer', 'script', 'style', 'noscript']);

  return turndownService;
};

// Extract main article content from HTML file
const extractMainContent = (htmlPath: string): string | null => {
  try {
    if (!fs.existsSync(htmlPath)) {
      return null;
    }

    const html = fs.readFileSync(htmlPath, 'utf8');

    // Check if this is a redirect page (very small file with window.location.href)
    if (html.length < REDIRECT_PAGE_MAX_SIZE && html.includes('window.location.href')) {
      return null; // Skip redirect pages
    }

    const $ = cheerio.load(html);

    // Remove unwanted elements
    $('nav, header, footer, script, style, noscript, .sidebar, .navigation').remove();

    // Try to find the main article content
    // Look for common article containers
    let mainContent = $('article').html() || $('main').html() || $('#main-content').html();

    // If we can't find a main content area, fall back to body but remove header/footer
    if (!mainContent) {
      $('body > header, body > footer, body > nav').remove();
      mainContent = $('body').html();
    }

    // Check if content is meaningful (more than just whitespace/empty tags)
    if (mainContent && mainContent.trim().length < MIN_CONTENT_LENGTH) {
      return null; // Skip pages with minimal content
    }

    return mainContent || null;
  } catch (error) {
    console.error(`Error extracting content from ${htmlPath}:`, error);
    return null;
  }
};

// Convert HTML content to Markdown
const convertToMarkdown = (htmlContent: string): string => {
  const turndownService = createTurndownService();

  // Convert HTML to Markdown
  const markdown = turndownService.turndown(htmlContent);

  // Clean up excessive newlines
  const cleanedMarkdown = markdown.replace(/\n{3,}/g, '\n\n');

  return cleanedMarkdown;
};

// Write markdown file
const writeMarkdownFile = (outputPath: string, content: string, reporter: any) => {
  try {
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content, 'utf8');
    return true;
  } catch (error) {
    reporter.error(`${REPORTER_PREFIX} Error writing markdown file ${outputPath}:`, error as Error);
    return false;
  }
};

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter, basePath }) => {
  const publicDir = path.join(process.cwd(), 'public');
  const docsDir = path.join(publicDir, 'docs');

  // Find all index.html files in the public/docs directory
  const htmlFiles = await fastGlob('**/index.html', {
    cwd: docsDir,
    absolute: false,
  });

  reporter.info(`${REPORTER_PREFIX} Found ${htmlFiles.length} HTML files to process`);

  // Process all HTML files and extract metadata
  const allPages = htmlFiles
    .map((htmlFile) => {
      const htmlPath = path.join(docsDir, htmlFile);
      const html = fs.readFileSync(htmlPath, 'utf8');

      // Skip redirect pages
      if (html.length < REDIRECT_PAGE_MAX_SIZE && html.includes('window.location.href')) {
        return null;
      }

      // Extract slug from file path (remove index.html)
      const slug = htmlFile.replace(/\/?index\.html$/, '').replace(/^\.\//, '');

      // Extract title and description from HTML meta tags
      const $ = cheerio.load(html);
      const title =
        $('meta[property="og:title"]').attr('content') ||
        $('meta[name="twitter:title"]').attr('content') ||
        $('title').text() ||
        'Untitled';
      const description =
        $('meta[name="description"]').attr('content') || $('meta[property="og:description"]').attr('content') || '';

      return {
        slug: slug || '.',
        title,
        description,
      };
    })
    .filter((page) => page !== null) as { slug: string; title: string; description: string }[];

  reporter.info(`${REPORTER_PREFIX} Processing ${allPages.length} content pages`);

  let successCount = 0;
  let failCount = 0;

  for (const page of allPages) {
    const { slug, title, description } = page;

    // Determine the HTML file path
    const htmlPath = path.join(publicDir, 'docs', slug, 'index.html');

    // Extract main content from HTML
    const htmlContent = extractMainContent(htmlPath);

    if (!htmlContent) {
      reporter.warn(`${REPORTER_PREFIX} Could not extract content for ${slug}`);
      failCount++;
      continue;
    }

    // Convert to markdown
    const markdown = convertToMarkdown(htmlContent);

    // Write markdown file
    const markdownPath = path.join(publicDir, 'docs', slug, 'index.md');
    const success = writeMarkdownFile(markdownPath, markdown, reporter);

    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  if (failCount > 0) {
    reporter.warn(`${REPORTER_PREFIX} Generated ${successCount} markdown files with ${failCount} failures`);
  } else {
    reporter.info(`${REPORTER_PREFIX} Successfully generated ${successCount} markdown files`);
  }
};
