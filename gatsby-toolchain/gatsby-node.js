const { transformNanocTextiles, makeHtmlTypeFromParentType, maybeRetrievePartial, flattenContentOrderedList } = require('./data/transform-utils');
const path = require("path");

const onCreateNode = async ({
    node,
    actions: { createNode, createParentChildLink },
    loadNodeContent,
    createNodeId,
    createContentDigest
}) => {
  if (node.extension === 'textile') {
    const content = await loadNodeContent(node);

    const createChildNode = ({ parent, child }) => {
      createNode(child);
      createParentChildLink({ parent, child });
    }
    transformNanocTextiles(
      node,
      content,
      createContentDigest,
      createNodeId(`${node.id} >>> HTML`),
      makeHtmlTypeFromParentType(node)
    )(createChildNode);
  }
}

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const documentTemplate = path.resolve(`src/templates/document.js`)
  const result = await graphql(`
    query {
      allFileHtml {
        edges {
          node {
            slug
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
  await Promise.all(result.data.allFileHtml.edges.map(async edge => {
    const contentOrderedList = flattenContentOrderedList(await Promise.all(edge.node.contentOrderedList.map(retrievePartialFromGraphQL)));

    createPage({
      path: `/${edge.node.slug}`,
      component: documentTemplate,
      context: {
        slug: edge.node.slug,
        contentOrderedList
      },
    });
  }));
}
exports.onCreateNode = onCreateNode;
exports.createPages = createPages;