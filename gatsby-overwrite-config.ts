import { GatsbyNode } from 'gatsby';
import path from 'path';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions, getConfig }) => {
  const prevConfig = getConfig();
  actions.replaceWebpackConfig({
    ...prevConfig,
    resolve: {
      ...prevConfig.resolve,
      fallback: {
        ...prevConfig.resolve.fallback,
        util: path.resolve('util/'),
      },
    },
  });
};
