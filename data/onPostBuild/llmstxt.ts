import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs';
import languageInfo from '../../src/data/languages/languageInfo';

/**
 * This script is used to create a file called llms.txt that contains a list of all the pages in the site.
 * It is heavily inspired by the gatsby-plugin-sitemap plugin, and stripped down to only to what we need.
 */

const LLMS_TXT_PREAMBLE = `# https://ably.com/docs llms.txt\n`;

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

  const serializedPages = [LLMS_TXT_PREAMBLE];

  for (const page of allPages) {
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
      if (languages && languages.length > 0) {
        for (const language of languages) {
          const langUrl = `${baseUrl}?lang=${language}`;
          const langLink = `[${safeTitle} (${getLanguageLabel(language)})](${langUrl})`;
          const langLine = `- ${[langLink, meta_description].join(': ')}`;
          serializedPages.push(langLine);
        }
      }
    } catch (err) {
      reporter.panic(`${REPORTER_PREFIX} Error serializing pages`, err as Error);
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
