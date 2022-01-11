const { flattenContentOrderedList, maybeRetrievePartial } = require("../transform");
const path = require("path");
const { postParser } = require("../transform/post-parser");
const textile = require("textile-js");
const { htmlParser } = require("../html-parser");

const createPages = async ({ graphql, actions: { createPage } }) => {
    const documentTemplate = path.resolve(`src/templates/document.js`)
    const result = await graphql(`
      query {
        allFileHtml {
          edges {
            node {
              slug
              contentOrderedList {
                data
                type
              }
            }
          }
        }
      }
    `);
    const retrievePartialFromGraphQL = maybeRetrievePartial(graphql);
    await Promise.all(result.data.allFileHtml.edges.map(async edge => {
      const content = flattenContentOrderedList(await Promise.all(edge.node.contentOrderedList.map(retrievePartialFromGraphQL)))
        .map(content => content.data)
        .join('');
      const postParsedContent = postParser(textile(content));
      const contentOrderedList = htmlParser(postParsedContent);
  
      createPage({
        path: `/documentation/${edge.node.slug}`,
        component: documentTemplate,
        context: {
          slug: edge.node.slug,
          contentOrderedList
        },
      });
    }));
  }

module.exports ={ createPages };