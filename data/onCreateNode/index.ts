import { GatsbyNode, Node } from 'gatsby';

// Touch existing derived nodes on every build so Gatsby's stale-node GC
// does not delete them on warm restart. Derived nodes created via
// `createNode` from inside `onCreateNode` are not re-created when their
// parent File nodes are cached unchanged, so without this hook the
// ExampleFile nodes disappear between dev runs and `allExampleFile`
// returns undefined in createPages.
export const sourceNodes: GatsbyNode['sourceNodes'] = ({ actions, getNodesByType }) => {
  const { touchNode } = actions;
  getNodesByType('ExampleFile').forEach((node) => touchNode(node));
};

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({
  node,
  actions: { createNode, createParentChildLink },
  loadNodeContent,
  createNodeId,
  createContentDigest,
}) => {
  if (node.sourceInstanceName === 'examples' && node.extension) {
    // Skip processing directories
    if (node.internal.type === 'Directory') {
      return;
    }

    const content = await loadNodeContent(node);
    const contentDigest = createContentDigest(content);
    const type = 'ExampleFile';
    const { relativePath, extension, id } = node;
    const [project, potentialLanguage] = (relativePath as string).split('/');
    const language =
      potentialLanguage && ['react', 'javascript', 'server'].includes(potentialLanguage) ? potentialLanguage : null;

    if (!project || !language) {
      return;
    }

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
};
