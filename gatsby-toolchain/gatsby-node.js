const _ = require('lodash');
const { transformNanocTextiles } = require('./transform-utils');

async function onCreateNode({
    node,
    actions: { createNode, createParentChildLink },
    loadNodeContent,
    createNodeId,
    createContentDigest
}) {
  if (node.extension !== 'textile') {
    return;
  }

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
    _.upperFirst(_.camelCase(`${node.internal.type}Html`))
  )(createChildNode);

}
exports.onCreateNode = onCreateNode