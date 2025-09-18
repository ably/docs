import dotenv from 'dotenv';
import remarkGfm from 'remark-gfm';

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const stripTrailingSlash = (str: string) => (str.endsWith('/') ? str.slice(0, -1) : str);

const mainWebsite = stripTrailingSlash(process.env.GATSBY_ABLY_MAIN_WEBSITE ?? 'http://localhost:3000');

// Define an asset prefix to serve static assets from a different domain or CDN
// This is used for Heroku PR deployments or when explicitly set via ASSET_PREFIX environment variable
export const assetPrefix =
  process.env.ASSET_PREFIX ||
  (process.env.HEROKU_PR_NUMBER ? `https://${process.env.HEROKU_APP_NAME}.herokuapp.com` : undefined);

export const trailingSlash = 'never';

export const siteMetadata = {
  siteUrl: mainWebsite,
  title: 'Documentation | Ably Realtime',
  externalScriptsData: {
    hubspotTrackingId: process.env.HUBSPOT_TRACKING_ID,
    addsearchSiteKey: process.env.ADDSEARCH_SITE_KEY,
    gtmContainerId: process.env.GTM_CONTAINER_ID,
    headwayAccountId: process.env.HEADWAY_ACCOUNT_ID,
    announcementEnabled: process.env.ANNOUNCEMENT_ENABLED,
    oneTrustDomain: process.env.ONE_TRUST_DOMAIN,
    oneTrustEnabled: process.env.ONE_TRUST_ENABLED,
    oneTrustTest: process.env.ONE_TRUST_TEST,
    inkeepChatEnabled: process.env.INKEEP_CHAT_ENABLED == 'true',
    inkeepSearchEnabled: process.env.INKEEP_SEARCH_ENABLED == 'true',
    inkeepApiKey: process.env.INKEEP_CHAT_API_KEY,
    insightsEnabled: process.env.INSIGHTS_ENABLED === 'true',
    insightsDebug: process.env.INSIGHTS_DEBUG === 'true',
    mixpanelApiKey: process.env.MIXPANEL_API_KEY,
    mixpanelAutoCapture: !!process.env.MIXPANEL_AUTO_CAPTURE,
    posthogApiKey: process.env.POSTHOG_API_KEY,
    posthogHost: process.env.POSTHOG_API_HOST || 'https://insights.ably.com',
    conversationsUrl: process.env.CONVERSATIONS_API_URL,
    intercomEnabled: process.env.INTERCOM_ENABLED === 'true',
    intercomAppId: process.env.INTERCOM_APP_ID || '',
  },
};

export const graphqlTypegen = true;

const headerLinkIcon = `<svg aria-hidden="true" height="20" version="1.1" viewBox="0 0 16 16" width="20"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>`;

export const plugins = [
  'gatsby-plugin-postcss',
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-yaml',
  {
    resolve: 'gatsby-transformer-sharp',
    options: {
      // Stop logging warnings for SVG & GIF files
      checkSupportedExtensions: false,
    },
  },
  'gatsby-plugin-react-helmet',
  {
    resolve: `gatsby-source-rss-feed`,
    options: {
      url: `https://changelog.ably.com/rss`,
      name: `AblyChangelog`,
    },
  },
  {
    resolve: 'gatsby-plugin-root-import',
    options: {
      'how-tos': `${__dirname}/how-tos`,
    },
  },
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: `100`,
            icon: headerLinkIcon,
            className: `gatsby-copyable-header`,
            removeAccents: true,
            isIconAfterHeader: true,
            elements: [`h2`, `h3`],
          },
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1200,
          },
        },
        'gatsby-remark-gifs',
      ],
      mdxOptions: {
        remarkPlugins: [
          // Add GitHub Flavored Markdown (GFM) support
          remarkGfm,
        ],
      },
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src/pages`,
    },
  },
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
      name: 'how-tos',
      path: './how-tos',
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `examples`,
      path: `${__dirname}/examples`,
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
  {
    resolve: '@sentry/gatsby',
  },
  `gatsby-plugin-client-side-redirect`, // Keep this last in the list; Source: https://www.gatsbyjs.com/plugins/gatsby-plugin-client-side-redirect/
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: `src/components/Layout/Layout.tsx`,
    },
  },
];
