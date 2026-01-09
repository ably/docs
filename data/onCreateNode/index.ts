import { GatsbyNode, Node } from 'gatsby';

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
