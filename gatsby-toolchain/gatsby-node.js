const { createPages } = require('./data/createPages');
const { onCreateNode } = require('./data/onCreateNode');

const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type PageFurnitureYaml implements Node {
      label: String!
      link: String!
      level: Int
      contentString: String
      contentArray: [PageFurnitureYaml!]
    }
  `
  createTypes(typeDefs)
}

exports.onCreateNode = onCreateNode;
exports.createPages = createPages;
exports.createSchemaCustomization = createSchemaCustomization;