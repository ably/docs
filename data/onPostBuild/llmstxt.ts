import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs';

/**
 * This script is used to create a file called llms.txt that contains a list of all the pages in the site.
 * It is heavily inspired by the gatsby-plugin-sitemap plugin, and stripped down to only to what we need.
 */

const LLMS_TXT_PREAMBLE = `# Ably Documentation

> Ably is a realtime experience infrastructure platform that provides pub/sub messaging, chat, realtime data synchronization, and more.

- **Global Edge Network**: Ultra-low latency realtime messaging delivered through a globally distributed edge network
- **Enterprise Scale**: Built to handle millions of concurrent connections with guaranteed message delivery
- **Multiple Products**: Pub/Sub, Chat, LiveSync, LiveObjects and Spaces
- **Developer-Friendly SDKs**: SDKs available for JavaScript, Node.js, Java, Python, Go, Objective-C, Swift, Csharp, PHP, Flutter, Ruby, React, React Native, and Kotlin

`;

const REPORTER_PREFIX = 'onPostBuild:';

interface DocumentQueryResult {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
  allMdx: {
    nodes: {
      parent: {
        relativeDirectory: string;
        name: string;
      };
      frontmatter: {
        title?: string;
        meta_description?: string;
      };
    }[];
  };
}

const withoutTrailingSlash = (path: string) => (path === `/` ? path : path.replace(/\/$/, ``));

const prefixPath = ({ url, siteUrl, pathPrefix = `` }: { url: string; siteUrl: string; pathPrefix?: string }) => {
  return new URL(pathPrefix + withoutTrailingSlash(url), siteUrl).toString();
};

const escapeMarkdown = (text: string) => {
  // backslash-escape Markdown special chars: \ ` * _ { } [ ] ( ) # + !
  return text.replace(/([\\`*_{}[\]()#+!])/g, '\\$1');
};

// Category structure for organizing pages
interface CategoryStructure {
  [category: string]: {
    title: string;
    pages?: Array<{
      slug: string;
      meta: { title: string; meta_description: string };
    }>;
    subcategories: {
      [subcategory: string]: {
        title: string;
        pages: Array<{
          slug: string;
          meta: { title: string; meta_description: string };
        }>;
      };
    };
  };
}

// Function to categorize a page based on its slug
const categorizePage = (slug: string): { category: string; subcategory?: string } => {
  const parts = slug.split('/');
  const firstPart = parts[0] || 'general';
  const secondPart = parts[1];

  // Define category mappings
  const categoryMap: Record<string, { category: string; subcategory?: string }> = {
    // Platform
    platform: { category: 'Platform' },
    account: { category: 'Platform', subcategory: 'Account Management' },
    architecture: { category: 'Platform', subcategory: 'Architecture' },
    deprecate: { category: 'Platform', subcategory: 'Deprecations' },
    errors: { category: 'Platform', subcategory: 'Errors' },
    integrations: { category: 'Platform', subcategory: 'Integrations' },
    pricing: { category: 'Platform', subcategory: 'Pricing' },
    auth: { category: 'Platform', subcategory: 'Authentication' },
    guides: { category: 'Platform' },
    sdks: { category: 'Platform', subcategory: 'SDKs' },
    'control-api': { category: 'Platform', subcategory: 'Control API' },

    // Pub/Sub - Core realtime messaging features
    api: { category: 'Pub/Sub', subcategory: 'API Reference' },
    basics: { category: 'Pub/Sub' },
    channels: { category: 'Pub/Sub', subcategory: 'Channels' },
    connect: { category: 'Pub/Sub', subcategory: 'Connections' },
    'getting-started': { category: 'Pub/Sub', subcategory: 'Getting Started' },
    messages: { category: 'Pub/Sub', subcategory: 'Messages' },
    'metadata-stats': { category: 'Pub/Sub', subcategory: 'Metadata & Statistics' },
    'presence-occupancy': { category: 'Pub/Sub', subcategory: 'Presence & Occupancy' },
    protocols: { category: 'Pub/Sub', subcategory: 'Protocols' },
    'pub-sub': { category: 'Pub/Sub' },
    push: { category: 'Pub/Sub', subcategory: 'Push Notifications' },
    'storage-history': { category: 'Pub/Sub', subcategory: 'Storage & History' },

    // Chat
    chat: { category: 'Chat' },

    // Spaces
    spaces: { category: 'Spaces' },

    // LiveObjects
    liveobjects: { category: 'LiveObjects' },

    // LiveSync
    livesync: { category: 'LiveSync' },

    // AI Transport
    'ai-transport': { category: 'AI Transport' },

    // General - FAQs
    faq: { category: 'General', subcategory: 'FAQs' },
  };

  // Try to match two-part path first (e.g., "platform/account"), then single part (e.g., "platform")
  const twoPartPath = secondPart ? `${firstPart}/${secondPart}` : null;

  // Special handling for API references - distinguish between REST SDK, Realtime SDK, and Control API
  if (firstPart === 'api') {
    if (secondPart === 'control-api') {
      return { category: 'Platform', subcategory: 'Control API' };
    } else if (secondPart === 'rest-sdk' || secondPart === 'rest-api' || secondPart === 'sse') {
      return { category: 'Pub/Sub', subcategory: 'REST SDK API Reference' };
    } else if (secondPart === 'realtime-sdk') {
      return { category: 'Pub/Sub', subcategory: 'Realtime SDK API Reference' };
    } else if (secondPart) {
      // For other api/* paths, keep them in general API Reference
      return { category: 'Pub/Sub', subcategory: 'API Reference' };
    }
    // For just /api (no second part), use general API Reference
    return { category: 'Pub/Sub', subcategory: 'API Reference' };
  }

  // Special handling for product/api pattern
  if (twoPartPath && secondPart === 'api') {
    // Check if it's a product-specific API
    if (
      categoryMap[firstPart] &&
      ['Chat', 'Spaces', 'LiveObjects', 'LiveSync'].includes(categoryMap[firstPart].category)
    ) {
      return { category: categoryMap[firstPart].category, subcategory: 'API Reference' };
    }
  }

  // Special handling for platform subdirectories
  if (firstPart === 'platform' && secondPart && categoryMap[secondPart]?.category === 'Platform') {
    return categoryMap[secondPart];
  }

  // Special handling for platform/account/control-api
  if (firstPart === 'platform' && secondPart === 'account' && parts[2] === 'control-api') {
    return { category: 'Platform', subcategory: 'Control API' };
  }

  if (categoryMap[firstPart]) {
    return categoryMap[firstPart];
  }

  // Default categorization for uncategorized pages
  return { category: 'General', subcategory: 'Documentation' };
};

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter, basePath }) => {
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
            }
          }
          frontmatter {
            title
            meta_description
          }
        }
      }
    }
  `;
  const { data: queryRecords, errors } = await graphql<DocumentQueryResult>(query);

  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query: ${JSON.stringify(errors, null, 2)}`);
    throw errors;
  }

  if (!queryRecords) {
    reporter.panicOnBuild(`No documents found.`);
    throw new Error('No documents found.');
  }

  const siteUrl = queryRecords.site.siteMetadata.siteUrl;

  if (!siteUrl) {
    reporter.panicOnBuild(`${REPORTER_PREFIX} Site URL not found.`);
    throw new Error('Site URL not found.');
  }

  // Process MDX pages (allMdx)
  const pages = queryRecords.allMdx.nodes
    .filter((node) => {
      // Only include pages from docs directory that have the required frontmatter
      return (
        node.parent.relativeDirectory.startsWith('docs') &&
        node.frontmatter?.title &&
        node.frontmatter?.meta_description
      );
    })
    .map((node) => {
      // Create slug from parent file info - remove 'docs/' prefix since it's already in relativeDirectory
      const slug = (
        node.parent.relativeDirectory + (node.parent.name === 'index' ? '' : `/${node.parent.name}`)
      ).replace(/^docs\//, '');

      return {
        slug,
        meta: {
          title: node.frontmatter.title!,
          meta_description: node.frontmatter.meta_description!,
        },
      };
    });

  reporter.info(`${REPORTER_PREFIX} Found ${pages.length} pages to place into llms.txt`);

  // Organize pages into categories
  const categoryStructure: CategoryStructure = {};

  for (const page of pages) {
    const { category, subcategory } = categorizePage(page.slug);

    // Initialize category if it doesn't exist
    if (!categoryStructure[category]) {
      categoryStructure[category] = {
        title: category,
        subcategories: {},
      };
    }

    // If no subcategory, add directly to category
    if (!subcategory) {
      if (!categoryStructure[category].pages) {
        categoryStructure[category].pages = [];
      }
      categoryStructure[category].pages.push(page);
    } else {
      // Initialize subcategory if it doesn't exist
      if (!categoryStructure[category].subcategories[subcategory]) {
        categoryStructure[category].subcategories[subcategory] = {
          title: subcategory,
          pages: [],
        };
      }

      // Add page to subcategory (only base page without language variants)
      categoryStructure[category].subcategories[subcategory].pages.push(page);
    }
  }

  // Generate serialized output with categorization
  const serializedPages = [LLMS_TXT_PREAMBLE];

  // Define the order of categories
  const categoryOrder = ['Platform', 'Pub/Sub', 'Chat', 'Spaces', 'LiveObjects', 'LiveSync', 'AI Transport', 'General'];

  // Sort categories by defined order
  const sortedCategories = Object.keys(categoryStructure).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) {
      return a.localeCompare(b);
    }
    if (indexA === -1) {
      return 1;
    }
    if (indexB === -1) {
      return -1;
    }
    return indexA - indexB;
  });

  // Helper function to serialize pages
  // Note: We only generate the base .md URL since the markdown endpoint returns
  // the same content regardless of language parameter - all language code snippets
  // are included in the single markdown file.
  const serializePages = (
    pages: Array<{ slug: string; meta: { title: string; meta_description: string } }>,
  ) => {
    for (const page of pages) {
      const { slug, meta } = page;
      const { title, meta_description } = meta;

      try {
        const baseUrl = prefixPath({ url: `/docs/${slug}.md`, siteUrl, pathPrefix: basePath });
        const safeTitle = escapeMarkdown(title);

        // Generate base page entry only (no language-specific variants needed)
        // The markdown file contains all language code snippets
        const baseLink = `[${safeTitle}](${baseUrl})`;
        const baseLine = `- ${[baseLink, meta_description].join(': ')}`;
        serializedPages.push(baseLine);
      } catch (err) {
        reporter.panic(`${REPORTER_PREFIX} Error serializing pages`, err as Error);
      }
    }
  };

  for (const categoryKey of sortedCategories) {
    const category = categoryStructure[categoryKey];
    serializedPages.push(`## ${category.title}`);
    serializedPages.push('');

    // Add pages directly under the category (no subcategory)
    if (category.pages && category.pages.length > 0) {
      serializePages(category.pages);
      serializedPages.push(''); // Add blank line after category pages
    }

    // Sort subcategories alphabetically
    const sortedSubcategories = Object.keys(category.subcategories).sort();

    for (const subcategoryKey of sortedSubcategories) {
      const subcategory = category.subcategories[subcategoryKey];
      serializedPages.push(`### ${subcategory.title}`);
      serializedPages.push('');

      serializePages(subcategory.pages);

      serializedPages.push(''); // Add blank line after each subcategory
    }
  }

  const llmsTxtPath = path.join(process.cwd(), 'public', 'llms.txt');
  try {
    fs.writeFileSync(llmsTxtPath, serializedPages.join('\n'));
    reporter.info(`${REPORTER_PREFIX} Successfully wrote llms.txt with ${serializedPages.length} pages`);
  } catch (err) {
    reporter.panic(`${REPORTER_PREFIX} Error writing llms.txt file`, err as Error);
  }
};
