export const siteMetadata = {
  siteUrl: 'https://www.ably.com/docs',
  title: 'Documentation | Ably Realtime',
};

export const assetPrefix = process.env.ASSET_PREFIX ?? 'http://localhost:9000';

export const plugins = [
  'gatsby-plugin-postcss',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-image',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-sharp',
  'gatsby-transformer-yaml',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-ts',
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
  // Meta Data
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      icon: 'src/images/favicon.png',
    },
  },
];
