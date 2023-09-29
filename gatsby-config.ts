const herokuAppSite = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : 'http://localhost:8000';

const mainWebsite = process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000';

export const trailingSlash = 'never';
export const siteMetadata = {
  siteUrl: `${mainWebsite}/docs`,
  title: 'Documentation | Ably Realtime',
};

export const assetPrefix = process.env.ASSET_PREFIX ?? herokuAppSite;

export const graphqlTypegen = true;

export const plugins = [
  'gatsby-plugin-postcss',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-yaml',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-root-import',
  'gatsby-plugin-mdx',
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
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'how-tos',
      path: './how-tos',
    },
  },
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      createLinkInHead: false,
    },
  },
  'gatsby-transformer-remark',
  `gatsby-plugin-client-side-redirect`, // Keep this last in the list; Source: https://www.gatsbyjs.com/plugins/gatsby-plugin-client-side-redirect/
];
