import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs';
import languageInfo from '../../src/data/languages/languageInfo';

/**
 * This script is used to create a file called llms.txt that contains a list of all the pages in the site.
 * It is heavily inspired by the gatsby-plugin-sitemap plugin, and stripped down to only to what we need.
 */

const LLMS_TXT_PREAMBLE = `# Ably Documentation

> Ably is a realtime experience infrastructure platform that provides pub/sub messaging, chat, realtime data synchronization, and more.

- **Global Edge Network**: Ultra-low latency realtime messaging delivered through a globally distributed edge network
- **Enterprise Scale**: Built to handle millions of concurrent connections with guaranteed message delivery
- **Multiple Products**: Pub/Sub, Chat, LiveSync, LiveObjects, Spaces, Asset Tracking, and powerful integrations
- **Developer-Friendly SDKs**: SDKs available for JavaScript, Python, Java, Go, Swift, and many more languages

`;

const REPORTER_PREFIX = 'onPostBuild:';

// Valid languages for URL generation (matching your requirements)
const VALID_LANGUAGES = [
  'javascript',
  'nodejs',
  'csharp',
  'flutter',
  'java',
  'objc',
  'php',
  'python',
  'ruby',
  'swift',
  'go',
  'kotlin',
  'react',
];

// Function to get the display label for a language
const getLanguageLabel = (languageKey: string): string => {
  return languageInfo[languageKey as keyof typeof languageInfo]?.label || languageKey;
};

interface DocumentQueryResult {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
  allFileHtml: {
    edges: {
      node: {
        slug: string;
        meta: {
          title: string;
          meta_description: string;
          languages?: string[];
        };
      };
    }[];
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
      internal: {
        contentFilePath?: string;
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
    subcategories: {
      [subcategory: string]: {
        title: string;
        pages: Array<{
          slug: string;
          meta: { title: string; meta_description: string };
          languages: string[];
        }>;
      };
    };
  };
}

// Function to categorize a page based on its slug
const categorizePage = (slug: string): { category: string; subcategory: string } => {
  const parts = slug.split('/');
  const firstPart = parts[0] || 'general';

  // Define category mappings
  const categoryMap: Record<string, { category: string; subcategory: string }> = {
    // Platform
    platform: { category: 'Platform', subcategory: 'Platform & Account' },
    auth: { category: 'Platform', subcategory: 'Authentication' },
    api: { category: 'Platform', subcategory: 'API Reference' },
    sdks: { category: 'Platform', subcategory: 'SDKs' },

    // Pub/Sub - Core realtime messaging features
    basics: { category: 'Pub/Sub', subcategory: 'Basics' },
    channels: { category: 'Pub/Sub', subcategory: 'Channels' },
    connect: { category: 'Pub/Sub', subcategory: 'Connections' },
    'getting-started': { category: 'Pub/Sub', subcategory: 'Getting Started' },
    guides: { category: 'Pub/Sub', subcategory: 'Guides' },
    'how-to': { category: 'Pub/Sub', subcategory: 'How-To' },
    messages: { category: 'Pub/Sub', subcategory: 'Messages' },
    'metadata-stats': { category: 'Pub/Sub', subcategory: 'Metadata & Statistics' },
    'presence-occupancy': { category: 'Pub/Sub', subcategory: 'Presence & Occupancy' },
    protocols: { category: 'Pub/Sub', subcategory: 'Protocols' },
    'pub-sub': { category: 'Pub/Sub', subcategory: 'Pub/Sub Features' },
    push: { category: 'Pub/Sub', subcategory: 'Push Notifications' },
    'storage-history': { category: 'Pub/Sub', subcategory: 'Storage & History' },

    // Chat
    chat: { category: 'Chat', subcategory: 'Chat' },

    // Spaces
    spaces: { category: 'Spaces', subcategory: 'Spaces' },

    // LiveObjects
    liveobjects: { category: 'LiveObjects', subcategory: 'LiveObjects' },

    // LiveSync
    livesync: { category: 'LiveSync', subcategory: 'LiveSync' },

    // Asset Tracking
    'asset-tracking': { category: 'Asset Tracking', subcategory: 'Asset Tracking' },
  };

  // Check if the first part matches a known category
  if (categoryMap[firstPart]) {
    return categoryMap[firstPart];
  }

  // Default categorization for uncategorized pages
  return { category: 'General', subcategory: 'Documentation' };
};

// Function to extract code element classes from an MDX file
const extractCodeLanguages = async (filePath: string): Promise<Set<string>> => {
  try {
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return new Set();
    }

    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Find all instances of code blocks with language specifiers (```language)
    const codeBlockRegex = /```(\w+)/g;
    let match;
    const languages = new Set<string>();

    while ((match = codeBlockRegex.exec(fileContent)) !== null) {
      if (match[1] && match[1].trim()) {
        languages.add(match[1].trim());
      }
    }
    return languages;
  } catch (error) {
    console.error(`Error extracting code element classes from ${filePath}:`, error);
    return new Set();
  }
};

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter, basePath }) => {
  const query = `
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }

      allFileHtml {
        edges {
          node {
            slug
            meta {
              title
              meta_description
              languages
            }
          }
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
          internal {
            contentFilePath
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

  // Process textile-based pages (allFileHtml) and extract languages
  const textilePages = queryRecords.allFileHtml.edges.map((edge) => {
    // Extract valid languages from the meta.languages field
    const metaLanguages = edge.node.meta.languages || [];
    const languages = metaLanguages.filter((lang) => VALID_LANGUAGES.includes(lang));

    return {
      ...edge.node,
      languages,
    };
  });

  // Process MDX pages (allMdx) and extract languages from files
  const mdxPages = await Promise.all(
    queryRecords.allMdx.nodes
      .filter((node) => {
        // Only include pages from docs directory that have the required frontmatter
        return (
          node.parent.relativeDirectory.startsWith('docs') &&
          node.frontmatter?.title &&
          node.frontmatter?.meta_description
        );
      })
      .map(async (node) => {
        // Create slug from parent file info - remove 'docs/' prefix since it's already in relativeDirectory
        const slug = (
          node.parent.relativeDirectory + (node.parent.name === 'index' ? '' : `/${node.parent.name}`)
        ).replace(/^docs\//, '');

        // Extract valid languages from the file content
        const filePath = node.internal.contentFilePath || '';
        const detectedLanguages = await extractCodeLanguages(filePath);
        const languages = Array.from(detectedLanguages).filter((lang) => VALID_LANGUAGES.includes(lang));

        return {
          slug,
          meta: {
            title: node.frontmatter.title!,
            meta_description: node.frontmatter.meta_description!,
          },
          languages,
        };
      }),
  );

  const allPages = [...textilePages, ...mdxPages];

  reporter.info(
    `${REPORTER_PREFIX} Found ${allPages.length} pages to place into llms.txt (${textilePages.length} textile, ${mdxPages.length} MDX)`,
  );

  // Organize pages into categories
  const categoryStructure: CategoryStructure = {};

  for (const page of allPages) {
    const { category, subcategory } = categorizePage(page.slug);

    // Initialize category if it doesn't exist
    if (!categoryStructure[category]) {
      categoryStructure[category] = {
        title: category,
        subcategories: {},
      };
    }

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

  // Generate serialized output with categorization
  const serializedPages = [LLMS_TXT_PREAMBLE];

  // Define the order of categories
  const categoryOrder = [
    'Platform',
    'Pub/Sub',
    'Chat',
    'Spaces',
    'LiveObjects',
    'LiveSync',
    'Asset Tracking',
    'General',
  ];

  // Sort categories by defined order
  const sortedCategories = Object.keys(categoryStructure).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  for (const categoryKey of sortedCategories) {
    const category = categoryStructure[categoryKey];
    serializedPages.push(`## ${category.title}`);
    serializedPages.push('');

    // Sort subcategories alphabetically
    const sortedSubcategories = Object.keys(category.subcategories).sort();

    for (const subcategoryKey of sortedSubcategories) {
      const subcategory = category.subcategories[subcategoryKey];
      serializedPages.push(`### ${subcategory.title}`);

      for (const page of subcategory.pages) {
        const { slug, meta, languages } = page;
        const { title, meta_description } = meta;

        try {
          const baseUrl = prefixPath({ url: `/docs/${slug}`, siteUrl, pathPrefix: basePath });
          const safeTitle = escapeMarkdown(title);

          // Generate base page entry (without language parameter)
          const baseLink = `[${safeTitle}](${baseUrl})`;
          const baseLine = `- ${[baseLink, meta_description].join(': ')}`;
          serializedPages.push(baseLine);

          // Generate language-specific entries if the page has languages
          // Skip language variants that match the page's primary language (e.g., skip ?lang=go for /getting-started/go)
          if (languages && languages.length > 0) {
            // Extract the last part of the slug to check if it matches a language
            const slugParts = slug.split('/');
            const slugLastPart = slugParts[slugParts.length - 1];

            // Map slug names to their corresponding language codes
            const slugToLangMap: Record<string, string> = {
              dotnet: 'csharp',
              'objective-c': 'objc',
            };

            // Get the primary language for this page (either direct match or mapped)
            const primaryLanguage = slugToLangMap[slugLastPart] || slugLastPart;

            for (const language of languages) {
              // Skip if the language matches the page's primary language
              if (language !== primaryLanguage) {
                const langUrl = `${baseUrl}?lang=${language}`;
                const langLink = `[${safeTitle} (${getLanguageLabel(language)})](${langUrl})`;
                const langLine = `- ${[langLink, meta_description].join(': ')}`;
                serializedPages.push(langLine);
              }
            }
          }
        } catch (err) {
          reporter.panic(`${REPORTER_PREFIX} Error serializing pages`, err as Error);
        }
      }

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
