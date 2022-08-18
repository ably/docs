import fs from 'fs';
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
  `;
  createTypes(typeDefs);
};

// Gatsby doesn't allow you to change sitemap filename, so we have to do it manually.
// https://github.com/gatsbyjs/gatsby/issues/31515
exports.onPostBuild = () => {
  if (fs.existsSync('./public/docs/sitemap-index.xml')) {
    fs.renameSync('./public/docs/sitemap-index.xml', './public/docs/sitemap.xml');
  }
};
