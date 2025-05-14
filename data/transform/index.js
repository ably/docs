const { upperFirst, camelCase } = require('lodash');
const { tryRetrieveMetaData, filterAllowedMetaFields, NO_MATCH, prepareAllowedMetaFields } = require('./front-matter');
const DataTypes = require('../types');
const { preParser } = require('./pre-parser');
const { processAfterFrontmatterExtracted } = require('./parser-enhancements');
const { maybeRetrievePartial } = require('./retrieve-partials');
const { flattenContentOrderedList } = require('./shared-utilities');
const { ARTICLE_TYPES } = require('./constants');

// Just the partial name: /<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/
const parseNanocPartials = (contentString) =>
  contentString.split(/(<%=\s+partial\s+partial_version\('[^')]*'\)[^%>]*%>)/);

const removeFalsy = (dataArray) => dataArray.filter((x) => !!x);
const makeTypeFromParentType = (type) => (node) => upperFirst(camelCase(`${node.internal.type}${type}`));

const createNodesFromPath =
  (type, { createNode, createNodeId, createContentDigest }) =>
  (path) => {
    const pieces = path.split('/');
    const values = {
      link: '',
      label: '',
      level: 0,
    };
    const breadcrumbs = pieces.map((piece, i) => {
      values.level = values.level + i > 1 ? 1 : values.level + i;
      values.link = `${values.link}/${piece}`;
      values.label = upperFirst(piece);
      values.id = createNodeId(`${values.link} >>> Path`);

      return { ...values };
    });
    breadcrumbs.forEach((breadcrumb, i) => {
      const newNodeData = {
        ...breadcrumb,
        children: [],
      };
      if (breadcrumbs[i - 1]) {
        newNodeData.parent = breadcrumbs[i - 1].id;
      }
      const newNodeInternals = {
        contentDigest: createContentDigest(breadcrumb.link),
        type,
        mediaType: 'text/plain',
      };
      const pathNode = {
        ...newNodeData,
        internal: newNodeInternals,
      };
      createNode(pathNode);
    });
  };

const constructDataObjectsFromStrings = (contentStrings, frontmatterMeta) => {
  contentStrings =
    frontmatterMeta !== NO_MATCH && frontmatterMeta.attributes
      ? contentStrings.map((content) => processAfterFrontmatterExtracted(content, frontmatterMeta.attributes))
      : contentStrings;
  const dataObjects = contentStrings.map((data, i) =>
    i % 2 === 0 ? { data: data, type: DataTypes.Html } : { data: data, type: DataTypes.Partial },
  );
  return dataObjects;
};

const splitDataAndMetaData = (text) => {
  const withPartials = parseNanocPartials(text);
  const withoutFalsyValues = removeFalsy(withPartials);

  const frontmatterMeta = tryRetrieveMetaData(withoutFalsyValues[0]);
  if (frontmatterMeta !== NO_MATCH) {
    withoutFalsyValues[0] = frontmatterMeta.body;
  }

  const asDataObjects = constructDataObjectsFromStrings(withoutFalsyValues, frontmatterMeta);
  return {
    data: asDataObjects,
    frontmatterMeta,
  };
};

// Source: https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-transformer-plugin/
const transformNanocTextiles =
  (node, content, id, type, { createNodesFromPath, createContentDigest, createNodeId }) =>
  (updateWithTransform) => {
    const slug = node.relativePath
      .replace(/(.*)\.[^.]+$/, '$1')
      .replace('root/', '')
      .replace(/index$/, '');

    // NOTE: we need to exclude all the tutorials pages from the docs site
    if (/^tutorials\/.*/.test(slug)) {
      return;
    }

    if (node.sourceInstanceName === 'textile-partials') {
      content = `${content}\n`;
    }
    const preTextileTransform = preParser(content);
    const { data, frontmatterMeta } = splitDataAndMetaData(preTextileTransform);

    let articleType = ARTICLE_TYPES.document;
    if (/^api\/.*/.test(slug)) {
      articleType = ARTICLE_TYPES.apiReference;
    }

    const newNodeData = {
      articleType,
      contentOrderedList: data,
      id,
      children: [],
      parent: node.id,
    };

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
          `No meta_description for file: ${node.relativePath}\n\nPlease add a custom meta_description to the frontmatter YAML at the top of the file.\n\n`,
        );
      }
    }

    const contentDigest = createContentDigest(data);

    const newNodeInternals = {
      contentDigest,
      type,
      mediaType: 'text/html',
    };
    if (node.sourceInstanceName === 'textile-partials') {
      newNodeInternals.type = `${type}Partial`;
      newNodeData.relativePath = node.relativePath;
    } else {
      createNodesFromPath(node.relativePath.replace(/\.[^/.]+$/, ''));
      // Partials should never have a slug, every other page type needs one.
      newNodeData.slug = slug;
    }

    const htmlNode = {
      ...newNodeData,
      internal: newNodeInternals,
    };
    if (content.id) {
      htmlNode.internal[`htmlId`] = content.id;
    }

    // Add completely separate nodes to keep track of relevant versions
    if (isVersion) {
      const version = slug.match(/\/versions\/v([\d.]+)/)[1];
      htmlNode.version = version;
      const versionNodeInternals = {
        contentDigest,
        type: makeTypeFromParentType('Version')(htmlNode),
        mediaType: 'text/html',
      };
      const versionNodeData = {
        parent: id,
        id: createNodeId(`${id} >>> Version`),
        children: [],
        slug,
        version,
      };
      const versionNode = {
        ...versionNodeData,
        internal: versionNodeInternals,
      };
      updateWithTransform({ parent: htmlNode, child: versionNode });
    }

    updateWithTransform({ parent: node, child: htmlNode });
  };

module.exports = {
  createNodesFromPath,
  transformNanocTextiles,
  makeTypeFromParentType,
  maybeRetrievePartial,
  flattenContentOrderedList,
};
