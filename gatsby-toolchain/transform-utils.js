const textile = require("textile-js");

const parseNanocPartials = contentString => contentString.split(/<%=\s+partial\s+partial_version\('([^')]*)'\)[^%>]*%>/);

// Source: https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/creating-a-transformer-plugin/
const transformNanocTextiles = (node, content, createContentDigest, id, type) => updateWithTransform => {
    // if we need it, use DOMParser not Cheerio!
    const parsedContent = textile(content);
    const withPartials = parseNanocPartials(content);
    const htmlNode = {
      contentOrderedList: withPartials,
      id,
      children: [],
      parent: node.id,
      internal: {
        content: parsedContent,
        contentDigest: createContentDigest(parsedContent),
        type,
        mediaType: 'text/html'
      },
    }
    if (content.id) {
        htmlNode[`htmlId`] = content.id
    }
    updateWithTransform({ parent: node, child: htmlNode })
}

module.exports = { transformNanocTextiles };