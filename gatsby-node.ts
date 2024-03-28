import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

export { createPages } from './data/createPages';
export { onCreateNode, createSchemaCustomization } from './data/onCreateNode';
export { onCreateWebpackConfig } from './gatsby-overwrite-config';
