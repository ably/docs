import path from 'path';
import textile from 'textile-js';
import { safeFileExists } from './safeFileExists';
import { flattenContentOrderedList, maybeRetrievePartial } from '../transform';
import { postParser } from '../transform/post-parser';
import { htmlParser } from '../html-parser';
import { LATEST_ABLY_API_VERSION_STRING } from '../transform/constants';
import { writeRedirectToConfigFile } from './writeRedirectToConfigFile';
import { siteMetadata } from '../../gatsby-config';
import { GatsbyNode } from 'gatsby';

const writeRedirect = writeRedirectToConfigFile('config/nginx-redirects.conf');
const documentTemplate = path.resolve(`src/templates/document.tsx`);
const apiReferenceTemplate = path.resolve(`src/templates/apiReference.tsx`);

interface Edge {
  node: {
    slug: string;
    version?: string;
    contentOrderedList: Array<{
      data: string;
      type: string;
    }>;
    meta?: {
      redirect_from?: string[];
    };
  };
}

interface DocumentQueryResult {
  allError: {
    nodes: {
      message: string;
    }[];
  };
  allFileHtml: {
    edges: {
      node: {
        slug: string;
        contentOrderedList: {
          data: string;
          type: string;
        }[];
        meta: {
          redirect_from?: string[];
        };
      };
    }[];
  };
}

interface ApiReferenceQueryResult {
  allFileHtml: {
    edges: {
      node: {
        slug: string;
        contentOrderedList: {
          data: string;
          type: string;
        }[];
        meta: {
          redirect_from?: string[];
        };
      };
    }[];
  };
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions: { createPage, createRedirect } }) => {
  /**
   * It's not ideal to have:
   * * the reusable function `documentCreator` defined inline like this
   * * so much of `documentCreator` being imperative processing of data
   * - but Gatsby throws horrible unrelated errors (from onCreateNode) if
   * you try to extract any of this functionality into an independent composable
   * and testable function.
   */

  // DOCUMENT TEMPLATE
  const documentResult = await graphql<DocumentQueryResult>(`
    query {
      allError {
        nodes {
          message
        }
      }
      allFileHtml(filter: { articleType: { eq: "document" } }) {
        edges {
          node {
            slug
            contentOrderedList {
              data
              type
            }
            meta {
              redirect_from
            }
          }
        }
      }
    }
  `);
  /**
   * We could log here, the reason we don't right now is that the error should already have been caught and logged.
   * Because Gatsby spawns a bunch of async processes during the onCreateNode step, though, and errors don't prevent
   * the onCreateNode processes from continuing, the workaround is to create Error nodes and then quit when we get
   * to the next synchronous stage in the Gatsby pipeline if any Error nodes exist.
   * It's an awkward solution and an alternative would be welcome, I'm not sure what we would do instead though.
   * We could log only during createPages and never during onCreateNode, but then if there's an error that does manage
   * to crash Gatsby somehow or the Error Node is broken, we wouldn't see the output.
   *
   * For context:
   * The original ticket here was EDX-21. When I originally detected missing meta descriptions, I wanted to
   * console.warn and continue just so editors could see the error. However it was decided that it should be a
   * requirement to always have a meta description, so the app had to avoid building while still throwing & logging
   * an error when a page didn't have a meta description.
   */
  if (documentResult.data?.allError.nodes && documentResult.data.allError.nodes.length > 0) {
    process.exit(1);
  }
  // API REFERENCES TEMPLATE
  const apiReferenceResult = await graphql<ApiReferenceQueryResult>(`
    query {
      allFileHtml(filter: { articleType: { eq: "apiReference" } }) {
        edges {
          node {
            slug
            contentOrderedList {
              data
              type
            }
            meta {
              redirect_from
            }
          }
        }
      }
    }
  `);

  const retrievePartialFromGraphQL = maybeRetrievePartial(graphql);

  const documentCreator =
    (documentTemplate: string) =>
    async (edge: Edge): Promise<string> => {
      const content = flattenContentOrderedList(
        await Promise.all(edge.node.contentOrderedList.map(retrievePartialFromGraphQL)),
      )
        .map((content: { data: unknown }) => (content.data ? content.data : ''))
        .join('\n');

      const postParsedContent = postParser(textile(content));
      const contentOrderedList = htmlParser(postParsedContent);

      const script = safeFileExists(`static/scripts/${edge.node.slug}.js`);

      const pagePath = `/docs/${edge.node.slug}`;

      const redirectFromList = edge.node.meta?.redirect_from;

      if (redirectFromList) {
        redirectFromList.forEach((redirectFrom) => {
          const redirectFromUrl = new URL(redirectFrom, siteMetadata.siteUrl);

          if (!redirectFromUrl.hash) {
            // We need to be prefix aware just like Gatsby's internals so it works
            // with nginx redirects
            writeRedirect(redirectFrom, pagePath);
          }

          createRedirect({
            fromPath: redirectFrom,
            toPath: pagePath,
            isPermanent: true,
            force: true,
            redirectInBrowser: true,
          });
        });
      }

      const slug = edge.node.slug;
      createPage({
        path: pagePath,
        component: documentTemplate,
        context: {
          slug,
          version: edge.node.version ?? LATEST_ABLY_API_VERSION_STRING,
          contentOrderedList,
          script,
          layout: { sidebar: true, searchBar: true, template: 'base' },
        },
      });
      return slug;
    };

  createRedirect({
    fromPath: '/',
    toPath: '/docs',
    isPermanent: true,
    redirectInBrowser: true,
  });

  // TODO: remove when examples are ready to be released
  createRedirect({
    fromPath: '/docs/examples',
    toPath: '/docs',
    isPermanent: true,
    redirectInBrowser: true,
  });

  if (!documentResult.data) {
    throw new Error('Document result is undefined');
  }

  if (!apiReferenceResult.data) {
    throw new Error('API reference result is undefined');
  }

  await Promise.all([
    ...documentResult.data.allFileHtml.edges.map(documentCreator(documentTemplate)),
    ...apiReferenceResult.data.allFileHtml.edges.map(documentCreator(apiReferenceTemplate)),
  ]);
};
