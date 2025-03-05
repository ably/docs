import { GatsbyNode, Node } from 'gatsby';
import { transformNanocTextiles, makeTypeFromParentType, createNodesFromPath } from '../transform';

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions: { createNode, createParentChildLink },
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  const createChildNode = ({ parent, child }: { parent: Node; child: Node }) => {
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      const ErrorNode = {
        id: createNodeId(`${errorMessage} >>> Error`),
        message: errorMessage,
        internal: {
          contentDigest: createContentDigest(errorMessage),
          type: 'Error',
        },
      };
      createNode(ErrorNode);
      console.error('Error at relative path:\n', node.relativePath ? `${node.relativePath}\n` : '\n', errorMessage);
    }
  }

  if (node.sourceInstanceName === 'how-tos') {
    // We derive the name of the how-to from the path
    const [tutorialName, src, ...paths] = (node.relativePath as string).split('/');

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

  if (node.sourceInstanceName === 'examples' && node.extension) {
    const content = await loadNodeContent(node);
    const contentDigest = createContentDigest(content);
    const type = 'ExampleFile';
    const { relativePath, extension, id } = node;
    const [project, potentialLanguage] = (relativePath as string).split('/');
    const language =
      potentialLanguage && ['react', 'javascript'].includes(potentialLanguage) ? potentialLanguage : null;
    if (project && (language || node.extension === 'md')) {
      const fields = {
        id: createNodeId(`${id} >>> Example`),
        extension,
        project,
        language,
        projectRelativePath: (relativePath as string).replace(`${project}/${language}/`, ''),
        content,
        internal: {
          contentDigest,
          type,
        },
      };
      createNode(fields);
    }
  }
};
