module.exports = {
  plugins: {
    // Must come before tailwindcss so nested @imports (e.g.
    // @ably/ui/reset/styles.css → ./styles/normalize.css) resolve.
    'postcss-import': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
