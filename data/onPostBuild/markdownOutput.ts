import { GatsbyNode, Reporter } from 'gatsby';
import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import { JSDOM, VirtualConsole } from 'jsdom';
import TurndownService from 'turndown';

const CONFIG = {
  htmlDir: './public',
  markdownDir: './public',
  excludePatterns: ['404.html', 'api/**/*', 'page-data/**/*', 'static/**/*', 'docs/404.html'],
  includeMetadata: true,
};

// Selectors for elements to remove from the HTML before converting to markdown
const UNWANTED_ELEMENTS_SELECTOR =
  'script, style, nav[role="navigation"], .header, #header, header, .footer, #footer, footer, [aria-label="breadcrumb"], aside';

// Prioritised selectors for the main content of the page, first match wins
const CONTENT_SELECTORS = ['main', '[role="main"]', '.content', '#content', 'article'];

const withoutTrailingSlash = (path: string) => (path === `/` ? path : path.replace(/\/$/, ``));

const cleanAttribute = (attribute: string | null) => {
  return attribute ? attribute.replace(/(\n+\s*)+/g, '\n') : '';
};

async function exportToMarkdown({ reporter, siteUrl }: { reporter: Reporter; siteUrl: string }) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    emDelimiter: '*',
  });

  // Remove the anchor tags from the headers
  turndownService.addRule('header', {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    replacement: (_, node) => {
      const level = parseInt(node.nodeName.charAt(1), 10);
      return `${'#'.repeat(level)} ${node.textContent}`;
    },
  });

  // Update local links to use the siteUrl
  turndownService.addRule('localLink', {
    filter: (node) => (node.nodeName === 'A' && node.getAttribute('href')?.startsWith('/')) || false,
    replacement: (content, node) => {
      // most of this replacement is taken from the turndown library directly
      let href = withoutTrailingSlash(siteUrl) + (node as HTMLElement).getAttribute('href');
      if (href) {
        href = href.replace(/([()])/g, '\\$1');
      }
      let title = cleanAttribute((node as HTMLElement).getAttribute('title'));
      if (title) {
        title = ' "' + title.replace(/"/g, '\\"') + '"';
      }
      return '[' + content + '](' + href + title + ')';
    },
  });

  // Find all HTML files
  const htmlFiles = await glob('**/*.html', {
    cwd: CONFIG.htmlDir,
    ignore: CONFIG.excludePatterns,
  });

  reporter.info(`Found ${htmlFiles.length} HTML files to process`);

  for (const htmlFile of htmlFiles) {
    try {
      const fullPath = path.join(CONFIG.htmlDir, htmlFile);
      const htmlContent = await fs.readFile(fullPath, 'utf-8');

      // Parse and clean HTML
      const virtualConsole = new VirtualConsole(); // Stop CSS parsing errors from polluting the console
      const dom = new JSDOM(htmlContent, { url: siteUrl, virtualConsole });
      const document = dom.window.document;

      // Remove unwanted elements
      const unwanted = document.querySelectorAll(UNWANTED_ELEMENTS_SELECTOR);
      unwanted.forEach((el) => el.remove());

      // Get main content
      let mainContent = null;

      for (const selector of CONTENT_SELECTORS) {
        mainContent = document.querySelector(selector);
        if (mainContent) {
          break;
        }
      }

      if (!mainContent) {
        mainContent = document.body;
      }

      // Convert to markdown
      const markdown = turndownService.turndown(mainContent.innerHTML);

      // Prepare final content
      let finalContent = '';

      if (CONFIG.includeMetadata) {
        const title = document.querySelector('title')?.textContent?.trim() || 'Untitled';
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
        const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

        finalContent = `---
title: "${title}"
url: ${canonicalUrl || `/${htmlFile.replace('.html', '').replace('/index', '')}`}
generated_at: ${new Date().toISOString()}
description: "${description}"
---

${markdown}`;
      } else {
        finalContent = markdown;
      }

      // Append .md to the filename, remove /index.html
      const outputName = `${htmlFile.replace('/index.html', '')}.md`;
      const outputPath = path.join(CONFIG.markdownDir, outputName);

      // Write markdown file
      await fs.writeFile(outputPath, finalContent);
    } catch (error) {
      reporter.error(`✗ Error processing ${htmlFile}:`, error as Error);
    }
  }

  reporter.info(`Markdown export complete! ${htmlFiles.length} files processed.`);
}

interface QueryResult {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
}

// Run the export
export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter }) => {
  const query = `
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `;
  const { data, errors } = await graphql<QueryResult>(query);

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    throw errors;
  }

  if (!data) {
    reporter.panicOnBuild(`No documents found.`);
    throw new Error('No documents found.');
  }

  const siteUrl = data.site.siteMetadata.siteUrl;

  if (!siteUrl) {
    reporter.panicOnBuild(`Site URL not found.`);
    throw new Error('Site URL not found.');
  }

  await exportToMarkdown({ reporter, siteUrl });
};
