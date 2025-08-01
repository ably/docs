import { GatsbyNode } from 'gatsby';
import * as path from 'path';
import * as fs from 'fs';

/**
 * This script is used to create a file called llms.txt that contains a list of all the pages in the site.
 * It is heavily inspired by the gatsby-plugin-sitemap plugin, and stripped down to only to what we need.
 */

const LLMS_TXT_PREAMBLE = `# https://ably.com/docs llms.txt\n`;

const REPORTER_PREFIX = 'onPostBuild:';

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

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql, reporter, basePath }) => {
  const query = `
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }

      allFileHtml(filter: { articleType: { in: ["document", "apiReference"] } }) {
        edges {
          node {
            slug
            meta {
              title
              meta_description
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

  // Process textile-based pages (allFileHtml)
  const textilePages = queryRecords.allFileHtml.edges.map((edge) => edge.node);

  // Process MDX pages (allMdx)
  const mdxPages = queryRecords.allMdx.nodes
    .filter((node) => {
      // Only include pages from docs directory that have the required frontmatter
      return (
        node.parent.relativeDirectory.startsWith('docs') &&
        node.frontmatter?.title &&
        node.frontmatter?.meta_description
      );
    })
    .map((node) => ({
      // Create slug from parent file info - remove 'docs/' prefix since it's already in relativeDirectory
      slug: (node.parent.relativeDirectory + (node.parent.name === 'index' ? '' : `/${node.parent.name}`)).replace(
        /^docs\//,
        '',
      ),
      meta: {
        title: node.frontmatter.title!,
        meta_description: node.frontmatter.meta_description!,
      },
    }));

  const allPages = [...textilePages, ...mdxPages];

  reporter.info(
    `${REPORTER_PREFIX} Found ${allPages.length} pages to place into llms.txt (${textilePages.length} textile, ${mdxPages.length} MDX)`,
  );

  const serializedPages = [LLMS_TXT_PREAMBLE];

  for (const page of allPages) {
    const { slug, meta } = page;
    const { title, meta_description } = meta;

    try {
      const url = prefixPath({ url: `/docs/${slug}`, siteUrl, pathPrefix: basePath });
      const safeTitle = escapeMarkdown(title);
      const link = `[${safeTitle}](${url})`;
      const line = `- ${[link, meta_description].join(': ')}`;
      serializedPages.push(line);
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
