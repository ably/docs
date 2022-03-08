const onCreateWebpackConfig = ({ actions, getConfig }, options = {}) => {
  const prevConfig = getConfig();
  actions.replaceWebpackConfig({
    ...prevConfig,
    resolve: {
      ...prevConfig.resolve,
      fallback: {
        ...prevConfig.resolve.fallback,
        util: require.resolve('util/'),
      },
    },
  });
};

module.exports = {
  onCreateWebpackConfig,
};
