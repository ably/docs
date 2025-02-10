/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    // 'franken-ui/postcss/sort-media-queries': {
    //   sort: 'mobile-first',
    // },
    'franken-ui/postcss/combine-duplicated-selectors': {
      removeDuplicatedProperties: true,
    },
  },
};

export default config;
