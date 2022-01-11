const yaml = require('js-yaml');
const { upperFirst, camelCase, identity, isPlainObject, lowerFirst, isEmpty, merge } = require('lodash');
const { tryRetrieveMetaData, filterAllowedMetaFields, NO_MATCH } = require("./front-matter");
const DataTypes = require("../types");
const { ROOT_LEVEL, MAX_LEVEL } = require("../../src/components/Sidebar/consts");
const { preParser } = require("./pre-parser");
const { enhancedParse } = require("./parser-enhancements");

const INLINE_TOC_REGEX = /^inline\-toc\.[\r\n\s]*^([\s\S]*?)^\s*$/m;

// TODO: split this into more focused files.
const parseNanocPartials = contentString => contentString.split(/<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/);
const tryRetrieveInlineTOC = contentString => contentString.match(INLINE_TOC_REGEX);
const removeInlineTOC = contentString => contentString.replace(INLINE_TOC_REGEX, '');
const processTOCItems = tocItem => {
  if(isEmpty(tocItem)) {
    return tocItem;
  }
  if(Array.isArray(tocItem)) {
    return tocItem.map(processTOCItems);
  }
  if(isPlainObject(tocItem)) {
    return {
      content: Object.entries(tocItem).map(([ key, values ]) => ({ key, values: processTOCItems(values) })),
    };
  }
  const linkParts = tocItem.match(/(.+)#(.+)/);
  const linkTitle = (linkParts && linkParts[1]) || tocItem;
  const link = (linkParts && linkParts[2]) || lowerFirst(tocItem);
  return {
    linkTitle,
    link: link.replace(/\s/g, '-')
  }
}
const retrieveAndReplaceInlineTOC = contentString => ({
  noInlineTOC: removeInlineTOC(contentString),
  inlineTOCOnly: (tryRetrieveInlineTOC(contentString) ?? [,null])[1]
});

const removeFalsy = dataArray => dataArray.filter(identity);
const makeTypeFromParentType = type => node => upperFirst(camelCase(`${node.internal.type}${type}`));

const createNodesFromPath = (type, { createNode, createNodeId, createContentDigest }) => path => {
  const pieces = path.split('/');
  const values = {
    link: '',
    label: '',
    level: ROOT_LEVEL
  };
  const breadcrumbs = pieces.map((piece, i) => {
    values.level = values.level + i > MAX_LEVEL ? MAX_LEVEL : values.level + i;
    values.link = `${values.link}/${piece}`;
    values.label = upperFirst(piece);
    values.id = createNodeId(`${values.link} >>> Path`)

    return { ...values };
  });
  breadcrumbs.forEach((breadcrumb, i) => {
    const newNodeData = {
      ...breadcrumb,
      children: [],
    };
    if(breadcrumbs[i-1]) {
      newNodeData.parent = breadcrumbs[i-1].id;
    }
    const newNodeInternals = {
      contentDigest: createContentDigest(breadcrumb.link),
      type,
      mediaType: 'text/plain'
    };
    const pathNode = {
      ...newNodeData,
      internal: newNodeInternals,
    }
    createNode(pathNode);
  });
}

const constructDataObjectsFromStrings = (contentStrings, frontmatterMeta) => {
  contentStrings = frontmatterMeta !== NO_MATCH && frontmatterMeta.attributes ?
    contentStrings.map(content => enhancedParse(content, frontmatterMeta.attributes)) :
    contentStrings;
  const dataObjects = contentStrings.map(
    (data, i) => i % 2 === 0 ?
      { data: data, type: DataTypes.Html } :
      { data: data, type: DataTypes.Partial }
  );
  return dataObjects;
}

const flattenContentOrderedList = contentOrderedList => contentOrderedList.reduce((acc, {data, type}) => {
  if(Array.isArray(data)) {
      return acc.concat(flattenContentOrderedList(data));
  }
  return acc.concat([{ data, type }]);
}, []);

// Source: https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-transformer-plugin/
const transformNanocTextiles = (node, content, id, type, { createNodesFromPath, createContentDigest, createNodeId }) => updateWithTransform => {
    const slug = node.relativePath.replace(/(.*)\.[^.]+$/, "$1");
    const preTextileTransform = preParser(content);
    // We could re-arrange & limit this to the last array item if we are confident that no partials will appear in the API reference.
    const {
      noInlineTOC,
      inlineTOCOnly
    } = retrieveAndReplaceInlineTOC(preTextileTransform);
    const loadedInlineTOC = yaml.load(inlineTOCOnly,'utf-8');
    const inlineTOCLinks = {
      tableOfContents: processTOCItems(loadedInlineTOC)
    };
    const inlineTOCNode = merge(inlineTOCLinks, {
      id: createNodeId(`${id} >>> InlineTOC`),
      children: [],
      parent: node.id,
      slug,
      internal: {
        contentDigest: createContentDigest(inlineTOCLinks),
        type: makeTypeFromParentType('InlineTOC')(node),
      }
    });
    updateWithTransform({ parent: node, child: inlineTOCNode });
    // if we need it, remember to use DOMParser not Cheerio!
    const withPartials = parseNanocPartials(noInlineTOC);

    const withoutFalsyValues = removeFalsy(withPartials);

    const frontmatterMeta = tryRetrieveMetaData(withoutFalsyValues[0]);
    if(frontmatterMeta !== NO_MATCH) {
      withoutFalsyValues[0] = frontmatterMeta.body;
    }

    const asDataObjects = constructDataObjectsFromStrings(withoutFalsyValues, frontmatterMeta);
    const newNodeData = {
      contentOrderedList: asDataObjects,
      id,
      children: [],
      parent: node.id,
    };

    if(frontmatterMeta !== NO_MATCH) {
      newNodeData.meta = filterAllowedMetaFields(frontmatterMeta.attributes);
    }

    const newNodeInternals = {
      contentDigest: createContentDigest(asDataObjects),
      type,
      mediaType: 'text/html'
    };
    if(node.sourceInstanceName === 'textile-partials') {
      newNodeInternals.type = `${type}Partial`;
      newNodeData.relativePath = node.relativePath;
    } else {
      createNodesFromPath(node.relativePath.replace(/\.[^/.]+$/, ""));
      // Partials should never have a slug, every other page type needs one.
      newNodeData.slug = slug;
    }
    const htmlNode = {
      ...newNodeData,
      internal: newNodeInternals,
    }
    if (content.id) {
        htmlNode[`htmlId`] = content.id
    }
    updateWithTransform({ parent: node, child: htmlNode })
}

const maybeRetrievePartial = graphql => async ({ data, type }) => {
  if(type !== DataTypes.Partial) {
    return { data, type };
  }
  const result = await graphql(`
      query {
        fileHtmlPartial(relativePath: { eq:"${data}.textile"}) {
          contentOrderedList {
            data
            type
          }
        }
      }
    `)
  const partial = result.data.fileHtmlPartial;
  const retrievePartialFromGraphQL = maybeRetrievePartial(graphql);
  let contentOrderedList = partial && partial.contentOrderedList;
  if(partial) {
    contentOrderedList = await Promise.all(contentOrderedList.map(retrievePartialFromGraphQL));
  }

  return {
    data: contentOrderedList,
    type
  };
}

module.exports = {
  createNodesFromPath,
  transformNanocTextiles,
  makeTypeFromParentType,
  maybeRetrievePartial,
  flattenContentOrderedList
};