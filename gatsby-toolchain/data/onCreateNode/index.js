const { transformNanocTextiles, makeHtmlTypeFromParentType, createNodesFromPath } = require('../transform-utils');

const onCreateNode = async ({
    node,
    actions: { createNode, createParentChildLink },
    loadNodeContent,
    createNodeId,
    createContentDigest
}) => {
  const createChildNode = ({ parent, child }) => {
    createNode(child);
    createParentChildLink({ parent, child });
  };

  if (node.extension === 'textile') {
    const content = await loadNodeContent(node);

    transformNanocTextiles(
      node,
      content,
      createContentDigest,
      createNodeId(`${node.id} >>> HTML`),
      makeHtmlTypeFromParentType(node),
      createNodesFromPath('DocumentPath', { createNode, createNodeId, createContentDigest })
    )(createChildNode);
  }
}

module.exports = { onCreateNode };