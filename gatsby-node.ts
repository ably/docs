export { createPages } from './data/createPages';
export { onCreateNode } from './data/onCreateNode';
export { onCreatePage } from './data/onCreatePage';
export { createSchemaCustomization } from './data/onCreateNode/create-graphql-schema-customization';
export { onCreateBabelConfig } from './gatsby-overwrite-config';
export { onPostBuild } from './data/onPostBuild';

// Configure webpack to handle node: protocol for built-in modules
import type { GatsbyNode } from 'gatsby';
import webpack from 'webpack';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, getConfig }) => {
  const prevConfig = getConfig();

  actions.replaceWebpackConfig({
    ...prevConfig,
    plugins: [
      ...prevConfig.plugins,
      // Strip node: prefix from imports to handle built-in Node modules
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    ],
    resolve: {
      ...prevConfig.resolve,
      fallback: {
        ...prevConfig.resolve?.fallback,
        sqlite: false,
      },
    },
  });
};
