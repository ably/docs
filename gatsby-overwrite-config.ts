import { GatsbyNode } from 'gatsby';

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) => {
  // Define all possible compile flags. They key will be turned into a
  // global variable wrapped with double underscores, e.g. __DEBUG_MODE__,
  // and the value will be the environment variable to read.
  const COMPILE_FLAGS = {
    ENABLE_FETCH_WITH_CREDENTIALS: 'ENABLE_FETCH_WITH_CREDENTIALS',
    // DEBUG_MODE: 'DEBUG_MODE',
  } as const;

  // Helper to convert environment variable to boolean
  const envToBool = (value: string | undefined): boolean => {
    if (!value) {
      return false;
    }
    return ['1', 'true', 'yes'].includes(value.toLowerCase());
  };

  // Get all compile flags from environment
  const getCompileFlags = () => {
    const flags: Record<string, string> = {};

    Object.entries(COMPILE_FLAGS).forEach(([key, envVar]) => {
      // Convert environment variable values to string 'true' or 'false'
      // This matches the format SWC expects in its globals configuration
      flags[`__${key}__`] = String(envToBool(process.env[envVar]));
    });

    return flags;
  };

  actions.setBabelPlugin({
    name: 'babel-plugin-transform-define',
    options: getCompileFlags(),
  });
};
