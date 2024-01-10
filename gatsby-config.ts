const herokuAppSite = process.env.HEROKU_APP_NAME
  ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  : 'http://localhost:8000';
const stripTrailingSlash = (str: string) => (str.endsWith('/') ? str.slice(0, -1) : str);

const mainWebsite = stripTrailingSlash(process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000');

// Set the provided asset prefix so we can fetch assets from elsewhere when specified
export const assetPrefix = process.env.ASSET_PREFIX;

// We're mounted under /docs in deployments
export const pathPrefix = '/docs';

export const trailingSlash = 'never';
export const siteMetadata = {
  siteUrl: mainWebsite,
  title: 'Documentation | Ably Realtime',
  externalScriptsData: {
    hubspotTrackingId: process.env.HUBSPOT_TRACKING_ID,
    addsearchSiteKey: process.env.ADDSEARCH_SITE_KEY,
    googleTagManagerAuthToken: process.env.GOOGLE_TAG_MANAGER_AUTH_TOKEN,
    gtmPreview: process.env.GOOGLE_TAG_MANAGER_PREVIEW,
    headwayAccountId: process.env.HEADWAY_ACCOUNT_ID,
    boomerangEnabled: process.env.BOOMERANG_ENABLED,
    announcementEnabled: process.env.ANNOUNCEMENT_ENABLED,
  },
};

export const graphqlTypegen = true;

export const plugins = [
  'gatsby-plugin-postcss',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-yaml',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-root-import',
    options: {
      HowTos: `${__dirname}/how-tos`,
    },
  },
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
