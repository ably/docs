const { flattenContentOrderedList, maybeRetrievePartial } = require("../transform");
const path = require("path");

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
      const contentOrderedList = flattenContentOrderedList(await Promise.all(edge.node.contentOrderedList.map(retrievePartialFromGraphQL)));
  
      createPage({
        path: `/${edge.node.slug}`,
        component: documentTemplate,
        context: {
          slug: edge.node.slug,
          contentOrderedList
        },
      });
    }));
  }

module.exports ={ createPages };