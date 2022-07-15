const { flattenContentOrderedList, maybeRetrievePartial } = require('../transform');
const path = require('path');
const { postParser } = require('../transform/post-parser');
const textile = require('textile-js');
const { htmlParser } = require('../html-parser');
const { createLanguagePageVariants } = require('./createPageVariants');
const { LATEST_ABLY_API_VERSION_STRING, DOCUMENTATION_PATH } = require('../transform/constants');
const { createContentMenuDataFromPage } = require('./createContentMenuDataFromPage');
const { DEFAULT_LANGUAGE } = require('./constants');
const { identity } = require('lodash');
const { safeFileExists } = require('./safeFileExists');

const createPages = async ({ graphql, actions: { createPage } }) => {
  const documentTemplate = path.resolve(`src/templates/document.js`);
  const result = await graphql(`
    query {
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
          }
        }
      }
    }
  `);
  const retrievePartialFromGraphQL = maybeRetrievePartial(graphql);
  await Promise.all(
    result.data.allFileHtml.edges.map(async (edge) => {
      const content = flattenContentOrderedList(
        await Promise.all(edge.node.contentOrderedList.map(retrievePartialFromGraphQL)),
      )
        .map((content) => (content.data ? content.data : ''))
        .join('\n');
      const postParsedContent = postParser(textile(content));
      const contentOrderedList = htmlParser(postParsedContent);
      const contentMenu = contentOrderedList.map((item) => createContentMenuDataFromPage(item));
      const languages = createLanguagePageVariants(identity, documentTemplate)(
        contentOrderedList,
        edge.node.slug,
        edge.node.parentSlug,
        edge.node.version,
      );

      const script = safeFileExists(`static/scripts/${edge.node.slug}.js`);

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

module.exports = { createPages };
