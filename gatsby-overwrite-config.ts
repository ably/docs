import { GatsbyNode } from 'gatsby';
import path from 'path';

// src: https://github.com/chadly/gatsby-plugin-env-variables/blob/master/src/gatsby-node.js
// We need this replicated because of installation conflicts with gatsby-plugin-env-variables
const allowList = ['HEROKU_APP_NAME'];

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, plugins, getConfig }) => {
  const prevConfig = getConfig();
  let pluginsToAdd: unknown[] = [];
  if (allowList) {
    const envVars = Object.keys(process.env).reduce((acc, key) => {
      if (allowList.indexOf(key) >= 0) {
        acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
      }
      return acc;
    }, {});
    if (Object.keys(envVars).length) {
      pluginsToAdd = [plugins.define(envVars)];
    }
  }
  actions.replaceWebpackConfig({
    ...prevConfig,
    plugins: [...prevConfig.plugins, ...pluginsToAdd],
    resolve: {
      ...prevConfig.resolve,
      fallback: {
        ...prevConfig.resolve.fallback,
        util: path.resolve('util/'),
      },
    },
  });
};
