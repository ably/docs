const DataTypes = require('../../types');
const { flattenContentOrderedList } = require('../shared-utilities');
const { applyIndent } = require('./applyIndent');

const maybeRetrievePartial =
  (graphql) =>
  async ({ data, type }) => {
    if (type !== DataTypes.Partial) {
      return { data, type };
    }
    // Retrieving data about the partial
    // eslint-disable-next-line no-sparse-arrays
    const fileName = (data.match(/<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/) ?? [, ''])[1];

    const attributes = data.split(',');

    let attributeObject = {};
    if (attributes.length > 1) {
      const attributePairs = attributes
        .slice(1)
        .map((attr) => {
          const pairs = attr.match(/\s+(\w+):\s+(\w+)/);
          return pairs.length === 3 ? [pairs[1], pairs[2]] : null;
        })
        .filter((x) => !!x);
      attributeObject = Object.fromEntries(attributePairs);
    }

    // Retrieving the data contained in the partial based on the file name
    const result = await graphql(`
        query {
            fileHtmlPartial(relativePath: { eq:"${fileName}.textile"}) {
            contentOrderedList {
                data
                type
            }
            }
        }
        `);
    const partial = result.data.fileHtmlPartial;
    const retrievePartialFromGraphQL = maybeRetrievePartial(graphql);
    let contentOrderedList = partial && partial.contentOrderedList;
    if (partial) {
      // Repeat this operation on any partials contained inside the partial
      contentOrderedList = await Promise.all(contentOrderedList.map(retrievePartialFromGraphQL));
      contentOrderedList = flattenContentOrderedList(contentOrderedList);

      // Finally, apply the indentation specified from the attributeObject and return the data
      const indentation = parseInt(attributeObject['indent']);
      const applyIndentation = applyIndent(indentation);
      if (attributeObject['indent']) {
        if (!attributeObject['skip_first_indent']) {
          contentOrderedList = contentOrderedList.map(applyIndentation);
        }
      }
    }

    return {
      data: contentOrderedList,
      type,
    };
  };

module.exports = {
  maybeRetrievePartial,
};
