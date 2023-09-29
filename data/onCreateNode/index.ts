import { transformNanocTextiles, makeTypeFromParentType, createNodesFromPath } from '../transform';
import { createSchemaCustomization } from './create-graphql-schema-customization';

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
      console.error('Error at relative path:\n', node.relativePath ? `${node.relativePath}\n` : '\n', error.message);
    }
  }

  if (node.sourceInstanceName === 'how-tos') {
    // We derive the name of the how-to from the path
    const [tutorialName, src, ...paths] = node.relativePath.split('/');

    // this must be a supporting file outside of a how-to directory
    if (tutorialName === '') {
      return;
    }

    /*
     * If this file is in the src directory, we create a new HowToSourceFile node
     * associated with our tutorial
     */
    if (src === 'src') {
      // skip processing directories
      if (node.internal.type === 'Directory') {
        return;
      }

      const srcPath = paths.join('/');
      const content = await loadNodeContent(node);
      const contentDigest = createContentDigest(content);
      const type = 'HowToSourceFile';

      const fields = {
        id: createNodeId(`${node.id} >>> Sandpack`),
        howToName: tutorialName,
        srcPath,
        content,
        internal: {
          contentDigest,
          type,
          mediaType: node.internal.mediaType,
        },
      };
      createNode(fields);
    }
  }
};

module.exports = { onCreateNode, createSchemaCustomization };
