export const siteMetadata = {
  siteUrl: 'https://www.ably.com/docs',
  title: 'Documentation | Ably Realtime',
};

export const assetPrefix = process.env.ASSET_PREFIX ?? 'http://localhost:9000';

export const plugins = [
  'gatsby-plugin-postcss',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-yaml',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-ts',
  'gatsby-plugin-root-import',
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      resolveSiteUrl: () => siteMetadata.siteUrl,
      excludes: ['/_*'],
      output: '/docs',
      // NOTE: these didn't work in `exclude` field, so we had to use custom regex in filterPage function
      filterPages: ({ path }) =>
        // Legacy versions of pages are excluded from the sitemap (anything with a URL containing .../versions/vx.x/where x is at least one digit, e.g. v1.1, v1.2
        /\/\b(versions)\b\/(v)[0-9]./.test(path) ||
        // Urls with /docs/code-
        /\/\b(docs)\/\b(code-)/.test(path) ||
        // anything with a URL beginning with /docs/tutorials
        /\/\b(docs)\b\/(tutorials)\//.test(path) ||
        // /documentation/
        /\/\b(documentation)\/$/.test(path) ||
        // Exclude root domain url
        path === '/',
      serialize: ({ path }) => ({
        url: path,
        changefreq: 'monthly',
      }),
    },
  },
  // Images
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: './src/images',
    },
    __key: 'images',
  },
  // Data
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'textile-partials',
      path: './content/partials',
    },
    __key: 'textile-partials',
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'textile-nanoc-compatible',
      path: './content',
    },
    __key: 'textile-nanoc-compatible',
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'yaml-page-furniture',
      path: './data/yaml/page-furniture',
    },
    __key: 'yaml-page-furniture',
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'yaml-page-content',
      path: './data/yaml/page-content',
    },
    __key: 'yaml-page-content',
  },
  // Meta Data
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      icon: 'src/images/favicon.png',
    },
  },
  `gatsby-plugin-client-side-redirect`, // Keep this last in the list; Source: https://www.gatsbyjs.com/plugins/gatsby-plugin-client-side-redirect/
];
