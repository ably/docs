const onCreateWebpackConfig = ({ actions, getConfig }, options = {}) => {
    const prevConfig = getConfig();
  
    actions.replaceWebpackConfig({
        ...prevConfig,
        resolve: {
            ...prevConfig.resolve,
            fallback: {
                ...prevConfig.fallback,
                util: require.resolve("util/")
            }
        }
    });
};

export default onCreateWebpackConfig;