import { GatsbyNode } from 'gatsby';
export { createPages } from './data/createPages';
export { onCreateNode } from './data/onCreateNode';
export { onCreateWebpackConfig } from './gatsby-overwrite-config';

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions;
  // PageFurnitureYaml ensures that all fields we expect are defined on every level.
  const typeDefs = `
    type PageFurnitureYaml implements Node {
      label: String!
      link: String!
      name: String
      level: Int
      text: String
      items: [PageFurnitureYaml!]
    }
    type Error implements Node {
      message: String
    }
  `;
  createTypes(typeDefs);
};
