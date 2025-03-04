module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'franken-ui/postcss/combine-duplicated-selectors': {
      removeDuplicatedProperties: true,
    },
  },
};
