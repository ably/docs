const { transformNanocTextiles, makeTypeFromParentType, createNodesFromPath } = require('../transform');

const onCreateNode = async ({
  node,
  actions: { createNode, createParentChildLink },
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  const createChildNode = ({ parent, child }) => {
    createNode(child);
    createParentChildLink({ parent, child });
  };

  if (node.extension === 'textile') {
    const content = await loadNodeContent(node);
    try {
      transformNanocTextiles(node, content, createNodeId(`${node.id} >>> HTML`), makeTypeFromParentType('Html')(node), {
        createContentDigest,
        createNodesFromPath: createNodesFromPath('DocumentPath', { createNode, createNodeId, createContentDigest }),
        createNodeId,
      })(createChildNode);
    } catch (error) {
      const ErrorNode = {
        id: createNodeId(`${error.message} >>> Error`),
        message: error.message,
        internal: {
          contentDigest: createContentDigest(error.message),
          type: 'Error',
        },
      };
      createNode(ErrorNode);
      console.error(error.message);
    }
  }
};

module.exports = { onCreateNode };
