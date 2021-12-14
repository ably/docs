const textile = require("textile-js");
const _ = require('lodash');
const DataTypes = require("./types");

const parseNanocPartials = contentString => contentString.split(/<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/);
const removeFalsy = dataArray => dataArray.filter(_.identity);

const constructDataObjectsFromStrings = contentStrings => contentStrings.map(
  (data, i) => i % 2 === 0 ?
    { data, type: DataTypes.String } :
    { data, type: DataTypes.Partial }
  );

// Source: https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-transformer-plugin/
const transformNanocTextiles = (node, content, createContentDigest, id, type) => updateWithTransform => {
    // if we need it, use DOMParser not Cheerio!
    const parsedContent = textile(content);
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
      contentDigest: createContentDigest(parsedContent),
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

module.exports = { transformNanocTextiles, makeHtmlTypeFromParentType };