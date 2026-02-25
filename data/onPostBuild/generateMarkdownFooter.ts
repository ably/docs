import platformNavData from '../../src/data/nav/platform';
import pubsubNavData from '../../src/data/nav/pubsub';
import chatNavData from '../../src/data/nav/chat';
import aiTransportNavData from '../../src/data/nav/aitransport';
import spacesNavData from '../../src/data/nav/spaces';
import liveObjectsNavData from '../../src/data/nav/liveobjects';
import liveSyncNavData from '../../src/data/nav/livesync';
import { NavProduct, NavProductPages } from '../../src/data/nav/types';

/**
 * Minimal MDX node shape needed by the navigation footer module.
 * The full MdxNode interface (with absolutePath, contentFilePath, etc.) lives in transpileMdxToMarkdown.ts.
 */
export interface NavMdxNode {
  parent: {
    relativeDirectory: string;
    name: string;
  };
  frontmatter?: {
    meta_description?: string;
  };
}

export interface FlatNavPage {
  name: string;
  link: string;
  product: string;
  sectionKey: string;
}

export interface NavLink {
  name: string;
  url: string;
  description: string;
}

export interface NavContext {
  prev?: NavLink;
  next?: NavLink;
  siblings: NavLink[];
}

/**
 * Flatten all navigation pages from all products into a depth-first ordered list.
 * Each entry includes the page name, link, product name, and a section key for sibling grouping.
 */
function flattenNavPages(): FlatNavPage[] {
  const allProducts: NavProduct[] = [
    platformNavData,
    pubsubNavData,
    chatNavData,
    aiTransportNavData,
    spacesNavData,
    liveObjectsNavData,
    liveSyncNavData,
  ];

  const result: FlatNavPage[] = [];

  const walkPages = (pages: NavProductPages[], sectionName: string, productName: string) => {
    for (const item of pages) {
      if ('pages' in item) {
        // Section with nested pages
        walkPages(item.pages, item.name, productName);
      } else if ('link' in item) {
        // Leaf page
        if (item.external) {
          continue;
        }
        result.push({
          name: item.name,
          link: item.link,
          product: productName,
          sectionKey: `${productName}::${sectionName}`,
        });
      }
    }
  };

  for (const product of allProducts) {
    // Walk content pages
    walkPages(product.content, '__root__', product.name);
    // Walk API pages
    walkPages(product.api, '__root__', product.name);
  }

  return result;
}

/**
 * Convert an MDX node's file info to the corresponding nav link.
 * - relativeDirectory: 'docs/chat/rooms', fileName: 'messages' → '/docs/chat/rooms/messages'
 * - relativeDirectory: 'docs/chat/rooms', fileName: 'index' → '/docs/chat/rooms'
 * - relativeDirectory: 'docs', fileName: 'index' → '/docs'
 */
function mdxNodeToNavLink(relativeDirectory: string, fileName: string): string {
  // Remove 'docs' or 'docs/' prefix
  const pathWithoutDocs = relativeDirectory.replace(/^docs\/?/, '');
  const pathParts = pathWithoutDocs.split('/').filter((p) => p);

  if (fileName !== 'index') {
    pathParts.push(fileName);
  }

  return pathParts.length > 0 ? `/docs/${pathParts.join('/')}` : '/docs';
}

/**
 * Build a set of nav links that have corresponding MDX source files.
 * Used to filter out .tsx pages from navigation.
 */
function buildMdxPageSet(mdxNodes: NavMdxNode[]): Set<string> {
  const pageSet = new Set<string>();
  for (const node of mdxNodes) {
    const navLink = mdxNodeToNavLink(node.parent.relativeDirectory, node.parent.name);
    pageSet.add(navLink);
  }
  return pageSet;
}

/**
 * Build a map from nav links to meta_description values from frontmatter.
 */
function buildMetaDescriptionMap(mdxNodes: NavMdxNode[]): Map<string, string> {
  const descMap = new Map<string, string>();
  for (const node of mdxNodes) {
    const metaDesc = node.frontmatter?.meta_description;
    if (metaDesc) {
      const navLink = mdxNodeToNavLink(node.parent.relativeDirectory, node.parent.name);
      descMap.set(navLink, metaDesc);
    }
  }
  return descMap;
}

/**
 * Build a lookup map for navigation context (prev/next/siblings) for each page.
 * Filters out pages not in mdxPageSet to avoid broken links to .tsx pages.
 */
function buildNavigationLookup(
  siteUrl: string,
  metaDescriptions: Map<string, string>,
  mdxPageSet: Set<string>,
): Map<string, NavContext> {
  const baseUrl = siteUrl.replace(/\/$/, '');
  const allPages = flattenNavPages();

  // Filter to only pages that have MDX source files
  const filteredPages = allPages.filter((page) => mdxPageSet.has(page.link));

  // Group by product for prev/next
  const productPages = new Map<string, FlatNavPage[]>();
  for (const page of filteredPages) {
    const existing = productPages.get(page.product) || [];
    existing.push(page);
    productPages.set(page.product, existing);
  }

  // Group by sectionKey for siblings
  const sectionPages = new Map<string, FlatNavPage[]>();
  for (const page of filteredPages) {
    const existing = sectionPages.get(page.sectionKey) || [];
    existing.push(page);
    sectionPages.set(page.sectionKey, existing);
  }

  const linkToMdUrl = (link: string): string => `${baseUrl}${link}.md`;

  const lookup = new Map<string, NavContext>();

  for (const [, pages] of productPages) {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const prev = i > 0 ? pages[i - 1] : undefined;
      const next = i < pages.length - 1 ? pages[i + 1] : undefined;

      // Get siblings (other pages in same section, excluding current page)
      const siblings = (sectionPages.get(page.sectionKey) || [])
        .filter((s) => s.link !== page.link)
        .map(
          (s): NavLink => ({
            name: s.name,
            url: linkToMdUrl(s.link),
            description: metaDescriptions.get(s.link) || s.name,
          }),
        );

      const navContext: NavContext = {
        prev: prev
          ? { name: prev.name, url: linkToMdUrl(prev.link), description: metaDescriptions.get(prev.link) || prev.name }
          : undefined,
        next: next
          ? { name: next.name, url: linkToMdUrl(next.link), description: metaDescriptions.get(next.link) || next.name }
          : undefined,
        siblings,
      };

      lookup.set(page.link, navContext);
    }
  }

  return lookup;
}

/**
 * Generate a navigation footer with three sections: Page Navigation, Related Topics, Documentation Index.
 * The Documentation Index section provides instructions for discovering additional documentation via llms.txt.
 * Always returns a footer that includes at least the Documentation Index section, even if there is no
 * page navigation or related topics content.
 */
function generateNavigationFooter(navContext: NavContext, siteUrl: string): string {
  const baseUrl = siteUrl.replace(/\/$/, '');
  const sections: string[] = [];

  // Page Navigation section (prev/next with descriptions)
  if (navContext.prev || navContext.next) {
    const navLines: string[] = [];
    navLines.push('## Page Navigation');
    navLines.push('');
    if (navContext.prev) {
      navLines.push(`- Previous: [${navContext.prev.name}](${navContext.prev.url}): ${navContext.prev.description}`);
    }
    if (navContext.next) {
      navLines.push(`- Next: [${navContext.next.name}](${navContext.next.url}): ${navContext.next.description}`);
    }
    sections.push(navLines.join('\n'));
  }

  // Related Topics section (siblings, excluding pages already in Page Navigation)
  const navUrls = new Set<string>();
  if (navContext.prev) {
    navUrls.add(navContext.prev.url);
  }
  if (navContext.next) {
    navUrls.add(navContext.next.url);
  }

  const filteredSiblings = navContext.siblings.filter((s) => !navUrls.has(s.url));
  if (filteredSiblings.length > 0) {
    const siblingLines: string[] = [];
    siblingLines.push('## Related Topics');
    siblingLines.push('');
    for (const sibling of filteredSiblings) {
      siblingLines.push(`- [${sibling.name}](${sibling.url}): ${sibling.description}`);
    }
    sections.push(siblingLines.join('\n'));
  }

  // Documentation Index section (always present)
  const llmLines: string[] = [];
  llmLines.push('## Documentation Index');
  llmLines.push('');
  llmLines.push('To discover additional Ably documentation:');
  llmLines.push('');
  llmLines.push(`1. Fetch [llms.txt](${baseUrl}/llms.txt) for the canonical list of available pages.`);
  llmLines.push('2. Identify relevant URLs from that index.');
  llmLines.push('3. Fetch target pages as needed.');
  llmLines.push('');
  llmLines.push('Avoid using assumed or outdated documentation paths.');
  sections.push(llmLines.join('\n'));

  return '\n' + sections.join('\n\n') + '\n';
}

/**
 * High-level function that builds the complete navigation lookup from MDX nodes.
 * Encapsulates the three-step process: buildMdxPageSet → buildMetaDescriptionMap → buildNavigationLookup.
 * This is the main entry point for transpileMdxToMarkdown to build navigation context.
 */
function buildNavLookup(siteUrl: string, mdxNodes: NavMdxNode[]): Map<string, NavContext> {
  const mdxPageSet = buildMdxPageSet(mdxNodes);
  const metaDescriptions = buildMetaDescriptionMap(mdxNodes);
  return buildNavigationLookup(siteUrl, metaDescriptions, mdxPageSet);
}

export {
  flattenNavPages,
  mdxNodeToNavLink,
  buildMdxPageSet,
  buildMetaDescriptionMap,
  buildNavigationLookup,
  generateNavigationFooter,
  buildNavLookup,
};
