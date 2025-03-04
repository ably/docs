/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    'franken-ui/postcss/combine-duplicated-selectors': {
      removeDuplicatedProperties: true,
    },
  },
};

export default config;
