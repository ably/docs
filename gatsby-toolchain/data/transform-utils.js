const textile = require("textile-js");
const _ = require('lodash');
const DataTypes = require("./types");

const parseNanocPartials = contentString => contentString.split(/<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/);
const removeFalsy = dataArray => dataArray.filter(_.identity);

const constructDataObjectsFromStrings = contentStrings => contentStrings.map(
  (data, i) => i % 2 === 0 ?
    { data: textile(data), type: DataTypes.Html } :
    { data, type: DataTypes.Partial }
  );

const flattenContentOrderedList = contentOrderedList => contentOrderedList.reduce((acc, {data, type}) => {
  if(Array.isArray(data)) {
      return acc.concat(flattenContentOrderedList(data));
  }
  return acc.concat([{ data, type }]);
}, []);

// Source: https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-transformer-plugin/
const transformNanocTextiles = (node, content, createContentDigest, id, type) => updateWithTransform => {
    // if we need it, use DOMParser not Cheerio!
    const withPartials = parseNanocPartials(content);
    const withoutFalsyValues = removeFalsy(withPartials);
    const asDataObjects = constructDataObjectsFromStrings(withoutFalsyValues);
    const newNodeData = {
      contentOrderedList: asDataObjects,
      id,
      children: [],
      parent: node.id,
    };
    const newNodeInternals = {
      contentDigest: createContentDigest(asDataObjects),
      type,
      mediaType: 'text/html'
    };
    if(node.sourceInstanceName === 'textile-partials') {
      newNodeInternals.type = `${type}Partial`;
      newNodeData.relativePath = node.relativePath;
    } else {
      // Partials should never have a slug, every other page type needs one.
      newNodeData.slug = node.name;
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

const makeHtmlTypeFromParentType = node => _.upperFirst(_.camelCase(`${node.internal.type}Html`));

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
  // Recursively fill in any partials within partials
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

module.exports = { transformNanocTextiles, makeHtmlTypeFromParentType, maybeRetrievePartial, flattenContentOrderedList };