const { transformNanocTextiles, makeHtmlTypeFromParentType } = require('./data/transform-utils');
const path = require("path")

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
    console.log(node.id);
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
  result.data.allFileHtml.edges.forEach(edge => {
    // TODO: process contentOrderedList
    createPage({
      path: `/${edge.node.slug}`,
      component: documentTemplate,
      context: {
        slug: edge.node.slug,
        content: edge.node.contentOrderedList,
      },
    })
  });
}
exports.onCreateNode = onCreateNode;
exports.createPages = createPages;