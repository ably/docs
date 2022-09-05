import { htmlParser } from 'data/html-parser';
import { flattenContentOrderedList, maybeRetrievePartial } from 'data/transform';
import { DOCUMENTATION_PATH, LATEST_ABLY_API_VERSION_STRING } from 'data/transform/constants';
import { postParser } from 'data/transform/post-parser';
import { GatsbyNode } from 'gatsby';
import path from 'path';
import textile from 'textile-js';
import { DEFAULT_LANGUAGE } from '../constants';
import { createContentMenuDataFromPage } from '../createContentMenuDataFromPage';
import { getLanguagesFromContent } from '../createPageVariants';
import { safeFileExists } from '../safeFileExists';

type HtmlContent = {
  data: string | HtmlContent[];
  type: string;
};

type FileHtmlNode = {
  slug: string;
  parentSlug?: string;
  version: string;
  contentOrderedList: HtmlContent[];
  meta: {
    redirect_from: string[];
  };
};

type CreateDocumentsResult = {
  allError: {
    nodes: { message: string }[];
  };
  allFileHtml: {
    edges: { node: FileHtmlNode }[];
  };
};

export const createDocuments: GatsbyNode['createPages'] = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  const documentTemplate = path.resolve(`src/templates/document.js`);
  const result = await graphql<CreateDocumentsResult>(`
    query {
      allError {
        nodes {
          message
        }
      }
      allFileHtml {
        edges {
          node {
            slug
            parentSlug
            version
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
  if (!result.data) {
    return;
  }
  if (result.data.allError.nodes && result.data.allError.nodes.length > 0) {
    process.exit(1);
  }
  const retrievePartialFromGraphQL = maybeRetrievePartial(graphql);
  await Promise.all(
    result.data.allFileHtml.edges.map(async (edge) => {
      const content = flattenContentOrderedList(
        await Promise.all(edge.node.contentOrderedList.map(retrievePartialFromGraphQL)),
      )
        .map((content: HtmlContent) => (content.data ? content.data : ''))
        .join('\n');

      const postParsedContent = postParser(textile(content));
      const contentOrderedList = htmlParser(postParsedContent);
      const contentMenu = contentOrderedList.map((item) => createContentMenuDataFromPage(item));

      const languages = getLanguagesFromContent(contentOrderedList);

      const script = safeFileExists(`static/scripts/${edge.node.slug}.js`);

      const pagePath = `${DOCUMENTATION_PATH}${edge.node.slug}`;

      const redirectFromList = edge.node.meta?.redirect_from;
      if (redirectFromList) {
        redirectFromList.forEach((redirectFrom) => {
          const alreadyDocsPage = /^\/docs.*/.test(redirectFrom);
          const redirectFromPath = `${alreadyDocsPage ? '' : '/docs'}${redirectFrom}`;
          createRedirect({
            fromPath: redirectFromPath,
            toPath: pagePath,
            isPermanent: true,
            force: true,
            redirectInBrowser: true,
          });
        });
      }

      createPage({
        path: `${DOCUMENTATION_PATH}${edge.node.slug}`,
        component: documentTemplate,
        context: {
          slug: edge.node.parentSlug ? edge.node.parentSlug : edge.node.slug,
          version: edge.node.version ?? LATEST_ABLY_API_VERSION_STRING,
          language: DEFAULT_LANGUAGE,
          languages,
          contentOrderedList: contentOrderedList,
          contentMenu,
          script,
        },
      });
    }),
  );
};
