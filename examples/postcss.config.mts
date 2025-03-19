const baseConfig = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'franken-ui/postcss/combine-duplicated-selectors': {
      removeDuplicatedProperties: true,
    },
  },
};

export default baseConfig;
