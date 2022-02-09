const { createPages } = require('./data/createPages');
const { onCreateNode } = require('./data/onCreateNode');
const { onCreateWebpackConfig } = require('./gatsby-overwrite-config');

const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  // PageFurnitureYaml ensures that all fields we expect are defined on every level.
  const typeDefs = `
    type PageFurnitureYaml implements Node {
      label: String!
      link: String!
      name: String
      level: Int
      contentString: String
      contentArray: [PageFurnitureYaml!]
    }
  `
  createTypes(typeDefs)
}

exports.onCreateWebpackConfig = onCreateWebpackConfig;
exports.onCreateNode = onCreateNode;
exports.createPages = createPages;
exports.createSchemaCustomization = createSchemaCustomization;