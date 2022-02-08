const DataTypes = require("../../types");
const { indent, flattenContentOrderedList } = require('../shared-utilities');

const maybeRetrievePartial = graphql => async ({ data, type }) => {
    if(type !== DataTypes.Partial) {
        return { data, type };
    }
    const fileName = (data.match(/<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/) ?? [,''])[1];

    const attributes = data.split(',');

    let attributeObject = {};
    if(attributes.length > 1) {
        const attributePairs = attributes.slice(1)
        .map(attr => {
            const pairs = attr.match(/\s+(\w+):\s+(\w+)/);
            return pairs.length === 3 ? [pairs[1],pairs[2]] : null;
        })
        .filter(x => !!x);
        attributeObject = Object.fromEntries(attributePairs);
    }

    const result = await graphql(`
        query {
            fileHtmlPartial(relativePath: { eq:"${fileName}.textile"}) {
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
        contentOrderedList = flattenContentOrderedList(contentOrderedList);

        if(attributeObject['indent']) {
        if(attributeObject['skip_first_indent']) {
            contentOrderedList = contentOrderedList.map((content, i) => {
            if(i === 0) {
                return {
                ...content,
                data: indent(
                    content.data.substring(content.data.indexOf("\n") + 1),
                    parseInt(attributeObject['indent'])
                )
                };
            }

            return {
                ...content,
                data: indent(content.data, parseInt(attributeObject['indent']))
            }
            });
        } else {
            contentOrderedList = contentOrderedList.map(content => ({
            ...content,
            data: indent(content.data, parseInt(attributeObject['indent']))
            }));
        }
        }
    }

    return {
        data: contentOrderedList,
        type
    };
}

module.exports = {
    maybeRetrievePartial
};
