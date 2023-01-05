import { NodeInput } from 'gatsby';
import { isString } from 'lodash/fp';
import { makeTypeFromParentType } from '..';
import { ARTICLE_TYPES } from '../constants';
import { filterAllowedMetaFields, NO_MATCH, prepareAllowedMetaFields } from '../front-matter';
import { splitDataAndMetaData } from '../meta-data/utilities';

type CreateNodesFromPath = (path: string) => void;
type CreateContentDigest = (content: string | Record<string, unknown> | Record<string, unknown>[]) => string;

type MarkdownNodeData = {
  articleType: string;
  contentOrderedList: { data: string; type: string }[];
  id: string;
  children: [];
  parent: string;
  slug: string;
  meta?: Record<string, string | string[] | undefined>;
  parentSlug?: string;
  version?: string;
};
type UpdateWithTransform = ({ parent, child }: { parent: NodeInput; child: NodeInput }) => void;

export const transformMarkdown =
  (
    node: NodeInput,
    content: string,
    id: string,
    {
      createNodesFromPath,
      createContentDigest,
      createNodeId,
    }: {
      createNodesFromPath: CreateNodesFromPath;
      createContentDigest: CreateContentDigest;
      createNodeId: StringTransformation;
    },
  ) =>
  (updateWithTransform: UpdateWithTransform) => {
    const relativePath = node.relativePath && isString(node.relativePath) ? node.relativePath : '';
    const slug = relativePath
      .replace(/(.*)\.[^.]+$/, '$1')
      .replace('root/', '')
      .replace(/index$/, '');

    const { data, frontmatterMeta } = splitDataAndMetaData(content);

    let articleType: keyof typeof ARTICLE_TYPES = ARTICLE_TYPES.document;
    if (/^api\/.*/.test(slug)) {
      articleType = ARTICLE_TYPES.apiReference;
    }

    const newNodeData: MarkdownNodeData = {
      articleType,
      contentOrderedList: data,
      id,
      children: [],
      parent: node.id,
      slug,
    };

    createNodesFromPath(relativePath.replace(/\.[^/.]+$/, ''));

    const isVersion = /\/versions\/v[\d.]+/.test(slug);
    const isCompare = /^compare\/.*/.test(slug);
    const isClientLibDevelopmentGuide = /^client-lib-development-guide\/.*/.test(slug);

    const doesNotNeedMeta = isVersion || isCompare || isClientLibDevelopmentGuide;

    if (frontmatterMeta !== NO_MATCH) {
      newNodeData.meta = prepareAllowedMetaFields(filterAllowedMetaFields(frontmatterMeta.attributes));
      if (
        !doesNotNeedMeta &&
        process.env.NODE_ENV === 'development' &&
        process.env.EDITOR_WARNINGS_OFF !== 'true' &&
        !newNodeData.meta.meta_description
      ) {
        throw new Error(
          `No meta_description for file: ${relativePath}\n\nPlease add a custom meta_description to the frontmatter YAML at the top of the file.\n\n`,
        );
      }
    }

    const contentDigest = createContentDigest(data);

    const newNodeInternals: NodeInput['internal'] & { htmlId?: string } = {
      contentDigest,
      type: 'Markdown',
      mediaType: 'text',
    };

    const markdownNode = {
      ...newNodeData,
      internal: newNodeInternals,
    };

    // Add completely separate nodes to keep track of relevant versions
    if (isVersion) {
      const parentSlug = slug.replace(/\/versions\/v[\d.]+/, '');
      markdownNode.parentSlug = parentSlug;
      const version = slug.match(/\/versions\/v([\d.]+)/)?.[1];
      markdownNode.version = version;
      const versionNodeInternals = {
        contentDigest,
        type: makeTypeFromParentType('Version')(markdownNode),
        mediaType: 'text/html',
      };
      const versionNodeData = {
        parent: id,
        id: createNodeId(`${id} >>> Version`),
        children: [],
        parentSlug,
        slug,
        version,
      };
      const versionNode = {
        ...versionNodeData,
        internal: versionNodeInternals,
      };
      updateWithTransform({ parent: markdownNode, child: versionNode });
    }

    updateWithTransform({ parent: node, child: markdownNode });
  };
