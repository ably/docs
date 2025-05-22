import { NavProduct } from './types';

export default {
  name: 'Ably Asset Tracking',
  link: '/docs/asset-tracking',
  icon: {
    closed: 'icon-gui-prod-asset-tracking-outline',
    open: 'icon-gui-prod-asset-tracking-solid',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Asset Tracking',
          link: '/docs/asset-tracking/',
          index: true,
        },
      ],
    },
    {
      name: 'Track',
      pages: [
        {
          name: 'Using the example apps',
          link: '/docs/asset-tracking/example-apps',
          languages: ['javascript', 'kotlin', 'swift'],
        },
        {
          name: 'Using the SDKs',
          link: '/docs/asset-tracking/using-the-sdks',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: 'https://sdk.ably.com/builds/ably/ably-asset-tracking-android/main/dokka/index.html',
          name: 'Kotlin',
          external: true,
        },
        {
          link: 'https://sdk.ably.com/builds/ably/ably-asset-tracking-swift/main/jazzy/',
          name: 'Swift',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;
