const { transformNanocTextiles, makeTypeFromParentType, createNodesFromPath } = require('../transform');

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
      createNodeId(`${node.id} >>> HTML`),
      makeTypeFromParentType('Html')(node),
      {
        createContentDigest,
        createNodesFromPath: createNodesFromPath('DocumentPath', { createNode, createNodeId, createContentDigest }),
        createNodeId
      }
    )(createChildNode);
  }
}

module.exports = { onCreateNode };