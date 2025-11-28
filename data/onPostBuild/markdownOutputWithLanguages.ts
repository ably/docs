import { GatsbyNode, Reporter } from 'gatsby';
import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
import { JSDOM, VirtualConsole, ResourceLoader, FetchOptions, AbortablePromise } from 'jsdom';
import * as TurndownService from 'turndown';
import languageData from '../../src/data/languages/languageData';

const CONFIG = {
  htmlDir: './public',
  markdownDir: './public',
  excludePatterns: ['404.html', 'api/**/*', 'page-data/**/*', 'static/**/*', 'docs/404.html'],
  includeMetadata: true,
  hydrationTimeout: 30000, // 30 seconds
  languageSwitchTimeout: 5000, // 5 seconds per language
};

// Selectors for elements to remove from the HTML before converting to markdown
const UNWANTED_ELEMENTS_SELECTOR =
  'script, style, nav[role="navigation"], .header, #header, header, .footer, #footer, footer, [aria-label="breadcrumb"], aside';

// Prioritised selectors for the main content of the page, first match wins
const CONTENT_SELECTORS = ['main', '[role="main"]', '.content', '#content', 'article'];

const withoutTrailingSlash = (urlPath: string) => (urlPath === `/` ? urlPath : urlPath.replace(/\/$/, ``));

const cleanAttribute = (attribute: string | null) => {
  return attribute ? attribute.replace(/(\n+\s*)+/g, '\n') : '';
};

interface LanguageMarkdownOptions {
  reporter: Reporter;
  siteUrl: string;
  assetPrefix?: string;
}

/**
 * Custom ResourceLoader that rewrites ASSET_PREFIX URLs to local file paths
 */
class LocalAssetResourceLoader extends ResourceLoader {
  private assetPrefix?: string;
  private publicDir: string;

  constructor(assetPrefix?: string) {
    super();
    this.assetPrefix = assetPrefix;
    this.publicDir = path.resolve('./public');
  }

  fetch(url: string, options: FetchOptions): AbortablePromise<Buffer> {
    // If URL contains ASSET_PREFIX, rewrite to local path
    if (this.assetPrefix && url.includes(this.assetPrefix)) {
      const localPath = url.replace(this.assetPrefix, '');
      const fullPath = path.join(this.publicDir, localPath);

      const promise = (async () => {
        try {
          const content = await fs.readFile(fullPath, 'utf-8');
          return Buffer.from(content);
        } catch (error) {
          // If file doesn't exist locally, return null
          return null as any;
        }
      })() as AbortablePromise<Buffer>;

      // Add abort method to make it an AbortablePromise
      promise.abort = () => {};

      return promise;
    }

    // For other URLs, use default behavior (but we'll configure JSDOM to not load external resources)
    return super.fetch(url, options);
  }
}

/**
 * Rewrite asset URLs in HTML content from ASSET_PREFIX to relative paths
 */
function rewriteAssetUrls(html: string, assetPrefix?: string): string {
  if (!assetPrefix) return html;

  // Rewrite src and href attributes
  return html
    .replace(new RegExp(`src="${assetPrefix}`, 'g'), 'src="')
    .replace(new RegExp(`href="${assetPrefix}`, 'g'), 'href="')
    .replace(new RegExp(`src='${assetPrefix}`, 'g'), "src='")
    .replace(new RegExp(`href='${assetPrefix}`, 'g'), "href='");
}

/**
 * Extract product key from page path
 * Examples: /docs/realtime/channels -> realtime (maps to pubsub)
 */
function extractProductFromPath(htmlFile: string): string | null {
  const match = htmlFile.match(/docs\/(realtime|chat|spaces|asset-tracking)/i);
  if (!match) return null;

  const segment = match[1].toLowerCase();

  // Map path segments to product keys
  const productMap: Record<string, string> = {
    'realtime': 'pubsub',
    'chat': 'chat',
    'spaces': 'spaces',
    'asset-tracking': 'assetTracking',
  };

  return productMap[segment] || null;
}

/**
 * Detect available languages for a page
 */
function detectAvailableLanguages(document: Document, htmlFile: string): string[] {
  // Try to find language selector in the DOM
  const languageOptions = document.querySelectorAll('[data-language-selector] option, .language-selector option');
  if (languageOptions.length > 0) {
    return Array.from(languageOptions)
      .map(option => option.getAttribute('value'))
      .filter((val): val is string => !!val);
  }

  // Fallback: use product-based language data
  const product = extractProductFromPath(htmlFile);
  if (product && languageData[product as keyof typeof languageData]) {
    return Object.keys(languageData[product as keyof typeof languageData]);
  }

  return [];
}

/**
 * Wait for a condition with timeout
 */
function waitFor(
  condition: () => boolean,
  timeout: number,
  checkInterval: number = 100
): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const check = () => {
      if (condition()) {
        resolve(true);
        return;
      }

      if (Date.now() - startTime > timeout) {
        resolve(false);
        return;
      }

      setTimeout(check, checkInterval);
    };

    check();
  });
}

/**
 * Load and execute Gatsby bundles in JSDOM
 */
async function loadGatsbyBundles(
  dom: JSDOM,
  htmlFile: string,
  reporter: Reporter
): Promise<boolean> {
  const { window } = dom;
  const document = window.document;

  try {
    // Gatsby bundles are already in the HTML as script tags
    // We need to execute them in order
    const scripts = Array.from(document.querySelectorAll('script[src]'));

    // Find the Gatsby scripts
    const gatsbyScripts = scripts.filter(script => {
      const src = script.getAttribute('src') || '';
      return src.includes('webpack-runtime') ||
             src.includes('framework') ||
             src.includes('app') ||
             src.match(/^\/component---/);
    });

    // Scripts are already loaded by JSDOM, but we need to ensure they executed
    // Wait for Gatsby to be ready
    const gatsbyReady = await waitFor(
      () => {
        return !!(window as any).___gatsby && !!(window as any).React;
      },
      CONFIG.hydrationTimeout
    );

    if (!gatsbyReady) {
      reporter.warn(`Gatsby failed to hydrate for ${htmlFile}`);
      return false;
    }

    // Wait for the page to be fully rendered
    await waitFor(
      () => {
        const mainContent = document.querySelector(CONTENT_SELECTORS.join(','));
        return !!mainContent && mainContent.children.length > 0;
      },
      CONFIG.hydrationTimeout
    );

    return true;
  } catch (error) {
    reporter.error(`Error loading Gatsby bundles for ${htmlFile}:`, error as Error);
    return false;
  }
}

/**
 * Switch to a specific language and wait for content to update
 */
async function switchLanguage(
  dom: JSDOM,
  language: string,
  reporter: Reporter
): Promise<boolean> {
  const { window } = dom;
  const document = window.document;

  try {
    // Get current content hash to detect changes
    const getContentHash = () => {
      const mainContent = document.querySelector(CONTENT_SELECTORS.join(','));
      return mainContent ? mainContent.innerHTML.substring(0, 1000) : '';
    };

    const beforeHash = getContentHash();

    // Method 1: Try to manipulate the URL search params
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('lang', language);

    // Update window.location
    Object.defineProperty(window.location, 'search', {
      writable: true,
      value: currentUrl.search
    });
    Object.defineProperty(window.location, 'href', {
      writable: true,
      value: currentUrl.href
    });

    // Dispatch events that might trigger language change
    window.dispatchEvent(new window.Event('popstate'));
    window.dispatchEvent(new window.Event('hashchange'));

    // Method 2: Try to find and manipulate the language selector directly
    const languageSelector = document.querySelector('[data-language-selector] select, .language-selector select') as HTMLSelectElement;
    if (languageSelector) {
      languageSelector.value = language;

      // Trigger change event
      const changeEvent = new window.Event('change', { bubbles: true });
      languageSelector.dispatchEvent(changeEvent);
    }

    // Method 3: Try to manipulate React state directly if available
    if ((window as any).___LANGUAGE_CONTEXT___) {
      (window as any).___LANGUAGE_CONTEXT___.setLanguage(language);
    }

    // Wait for content to change (or timeout)
    const contentChanged = await waitFor(
      () => {
        const afterHash = getContentHash();
        return afterHash !== beforeHash && afterHash.length > 0;
      },
      CONFIG.languageSwitchTimeout
    );

    if (!contentChanged) {
      reporter.verbose(`Language switch to ${language} did not change content (might already be in that language)`);
    }

    // Additional wait to ensure all React updates are complete
    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
  } catch (error) {
    reporter.error(`Error switching to language ${language}:`, error as Error);
    return false;
  }
}

/**
 * Extract and convert content to markdown for a specific language
 */
function extractMarkdownForLanguage(
  document: Document,
  turndownService: TurndownService,
  language: string | null,
  siteUrl: string,
  htmlFile: string
): { markdown: string; metadata: Record<string, any> } {
  // Remove unwanted elements (create a clone to avoid modifying the original)
  const docClone = document.cloneNode(true) as Document;
  const unwanted = docClone.querySelectorAll(UNWANTED_ELEMENTS_SELECTOR);
  unwanted.forEach((el) => el.remove());

  // Get main content
  let mainContent = null;
  for (const selector of CONTENT_SELECTORS) {
    mainContent = docClone.querySelector(selector);
    if (mainContent) {
      break;
    }
  }

  if (!mainContent) {
    mainContent = docClone.body;
  }

  // Convert to markdown
  const markdown = turndownService.turndown(mainContent.innerHTML);

  // Extract metadata
  const title = document.querySelector('title')?.textContent?.trim() || 'Untitled';
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || '';
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';

  // Get language version if available
  const product = extractProductFromPath(htmlFile);
  let languageVersion: string | undefined;
  if (language && product) {
    const productData = languageData[product as keyof typeof languageData];
    if (productData && typeof productData === 'object') {
      languageVersion = (productData as any)[language];
    }
  }

  return {
    markdown,
    metadata: {
      title,
      url: canonicalUrl || `/${htmlFile.replace('.html', '').replace('/index', '')}`,
      description,
      language,
      languageVersion,
      generatedAt: new Date().toISOString(),
    },
  };
}

/**
 * Process a single HTML file with language support
 */
async function processHtmlFileWithLanguages(
  htmlFile: string,
  options: LanguageMarkdownOptions
): Promise<void> {
  const { reporter, siteUrl, assetPrefix } = options;

  try {
    const fullPath = path.join(CONFIG.htmlDir, htmlFile);
    let htmlContent = await fs.readFile(fullPath, 'utf-8');

    // Rewrite asset URLs if ASSET_PREFIX is set
    if (assetPrefix) {
      htmlContent = rewriteAssetUrls(htmlContent, assetPrefix);
    }

    // Create TurndownService
    const turndownService = new (TurndownService as any)({
      headingStyle: 'atx',
      codeBlockStyle: 'fenced',
      emDelimiter: '*',
    });

    // Add custom rules (same as original)
    turndownService.addRule('header', {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      replacement: (_, node) => {
        const level = parseInt(node.nodeName.charAt(1), 10);
        return `${'#'.repeat(level)} ${node.textContent}`;
      },
    });

    turndownService.addRule('localLink', {
      filter: (node) => (node.nodeName === 'A' && node.getAttribute('href')?.startsWith('/')) || false,
      replacement: (content, node) => {
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

    // Setup JSDOM with custom resource loader
    const virtualConsole = new VirtualConsole();
    virtualConsole.on('error', () => {}); // Suppress errors

    const resourceLoader = new LocalAssetResourceLoader(assetPrefix);

    const dom = new JSDOM(htmlContent, {
      url: siteUrl + '/' + htmlFile,
      runScripts: 'dangerously',
      resources: resourceLoader,
      virtualConsole,
      beforeParse(window) {
        // Mock necessary browser APIs
        (window as any).requestAnimationFrame = (cb: any) => setTimeout(cb, 0);
        (window as any).cancelAnimationFrame = (id: any) => clearTimeout(id);

        // Mock IntersectionObserver
        (window as any).IntersectionObserver = class IntersectionObserver {
          observe() {}
          unobserve() {}
          disconnect() {}
        };

        // Mock localStorage
        if (!(window as any).localStorage) {
          (window as any).localStorage = {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            clear: () => {},
          };
        }
      },
    });

    const { window } = dom;
    const document = window.document;

    // Detect available languages
    const availableLanguages = detectAvailableLanguages(document, htmlFile);

    if (availableLanguages.length === 0) {
      // No language selector found - generate single markdown file (current behavior)
      reporter.verbose(`No languages found for ${htmlFile}, generating single markdown`);

      const { markdown, metadata } = extractMarkdownForLanguage(
        document,
        turndownService,
        null,
        siteUrl,
        htmlFile
      );

      const finalContent = CONFIG.includeMetadata
        ? `---
title: "${metadata.title}"
url: ${metadata.url}
generated_at: ${metadata.generatedAt}
description: "${metadata.description}"
---

${markdown}`
        : markdown;

      const outputName = `${htmlFile.replace('/index.html', '')}.md`;
      const outputPath = path.join(CONFIG.markdownDir, outputName);
      await fs.writeFile(outputPath, finalContent);

      return;
    }

    reporter.info(`Found ${availableLanguages.length} languages for ${htmlFile}: ${availableLanguages.join(', ')}`);

    // Try to hydrate React
    const hydrated = await loadGatsbyBundles(dom, htmlFile, reporter);

    if (!hydrated) {
      reporter.warn(`Failed to hydrate React for ${htmlFile}, falling back to static extraction`);

      // Fall back to generating a single file without language switching
      const { markdown, metadata } = extractMarkdownForLanguage(
        document,
        turndownService,
        null,
        siteUrl,
        htmlFile
      );

      const finalContent = CONFIG.includeMetadata
        ? `---
title: "${metadata.title}"
url: ${metadata.url}
generated_at: ${metadata.generatedAt}
description: "${metadata.description}"
---

${markdown}`
        : markdown;

      const outputName = `${htmlFile.replace('/index.html', '')}.md`;
      const outputPath = path.join(CONFIG.markdownDir, outputName);
      await fs.writeFile(outputPath, finalContent);

      return;
    }

    // Generate markdown for each language
    for (const language of availableLanguages) {
      reporter.verbose(`Processing language: ${language} for ${htmlFile}`);

      // Switch to this language
      const switched = await switchLanguage(dom, language, reporter);

      if (!switched) {
        reporter.warn(`Failed to switch to language ${language} for ${htmlFile}`);
        continue;
      }

      // Extract content for this language
      const { markdown, metadata } = extractMarkdownForLanguage(
        document,
        turndownService,
        language,
        siteUrl,
        htmlFile
      );

      // Create final content with metadata
      const finalContent = CONFIG.includeMetadata
        ? `---
title: "${metadata.title}"
url: ${metadata.url}
generated_at: ${metadata.generatedAt}
description: "${metadata.description}"
language: "${metadata.language}"${metadata.languageVersion ? `\nlanguage_version: "${metadata.languageVersion}"` : ''}
---

${markdown}`
        : markdown;

      // Save with language suffix: page.javascript.md
      const baseName = htmlFile.replace('/index.html', '');
      const outputName = `${baseName}.${language}.md`;
      const outputPath = path.join(CONFIG.markdownDir, outputName);

      await fs.writeFile(outputPath, finalContent);
      reporter.verbose(`✓ Generated ${outputName}`);
    }
  } catch (error) {
    reporter.error(`Error processing ${htmlFile}:`, error as Error);
    throw error;
  }
}

/**
 * Export all HTML files to language-specific markdown
 */
export async function exportToMarkdownWithLanguages(options: LanguageMarkdownOptions): Promise<void> {
  const { reporter } = options;

  // Find all HTML files
  const htmlFiles = await glob('**/*.html', {
    cwd: CONFIG.htmlDir,
    ignore: CONFIG.excludePatterns,
  });

  reporter.info(`Found ${htmlFiles.length} HTML files to process with language support`);

  // Process files sequentially to avoid overwhelming the system
  // (JSDOM with React is resource-intensive)
  for (const htmlFile of htmlFiles) {
    try {
      await processHtmlFileWithLanguages(htmlFile, options);
    } catch (error) {
      reporter.error(`Failed to process ${htmlFile}:`, error as Error);
      // Continue with next file
    }
  }

  reporter.info(`✓ Language-aware markdown export complete! ${htmlFiles.length} files processed.`);
}

interface QueryResult {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
}

/**
 * Gatsby post-build hook
 */
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

  const assetPrefix = process.env.ASSET_PREFIX;

  await exportToMarkdownWithLanguages({
    reporter,
    siteUrl,
    assetPrefix,
  });
};
