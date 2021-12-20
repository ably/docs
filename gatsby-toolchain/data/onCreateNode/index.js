const { transformNanocTextiles, makeHtmlTypeFromParentType } = require('../transform-utils');

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

module.exports = { onCreateNode };