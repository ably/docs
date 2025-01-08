import dotenv from 'dotenv';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

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
    gtmContainerId: process.env.GTM_CONTAINER_ID,
    headwayAccountId: process.env.HEADWAY_ACCOUNT_ID,
    boomerangEnabled: process.env.BOOMERANG_ENABLED,
    announcementEnabled: process.env.ANNOUNCEMENT_ENABLED,
    oneTrustDomain: process.env.ONE_TRUST_DOMAIN,
    oneTrustEnabled: process.env.ONE_TRUST_ENABLED,
    oneTrustTest: process.env.ONE_TRUST_TEST,
    inkeepEnabled: process.env.INKEEP_CHAT_ENABLED,
    inkeepApiKey: process.env.INKEEP_CHAT_API_KEY,
    inkeepIntegrationId: process.env.INKEEP_CHAT_INTEGRATION_ID,
    inkeepOrganizationId: process.env.INKEEP_CHAT_ORGANIZATION_ID,
  },
};

export const graphqlTypegen = true;

export const plugins = [
  'gatsby-plugin-postcss',
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
      fastHash: true,
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
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: process.env.GTM_CONTAINER_ID,

      // Include GTM in development.
      //
      // If you have this configured locally it probably makes sense to enable it in development
      includeInDevelopment: !!process.env.GTM_CONTAINER_ID,

      // datalayer to be set before GTM is loaded
      // should be an object or a function that is executed in the browser
      //
      // Defaults to null
      defaultDataLayer: {
        platform: 'gatsby',
        // prevent the initial page_view event from firing as we'll be doing it manually in
        // GTM by listening for the gatsby-route-change events. This event is also fired when
        // the page loads initially
        gaPageView: false,
      },

      // Specify optional GTM environment details.
      gtmAuth: process.env.GTM_ENVIRONMENT_AUTH,
      gtmPreview: process.env.GTM_ENVIRONMENT_PREVIEW,
    },
  },
  `gatsby-plugin-client-side-redirect`, // Keep this last in the list; Source: https://www.gatsbyjs.com/plugins/gatsby-plugin-client-side-redirect/
];
