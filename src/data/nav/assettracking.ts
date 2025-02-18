import { NavProduct } from './types';

export default {
  name: 'Ably Asset Tracking',
  icon: {
    closed: 'icon-product-asset-tracking-mono',
    open: 'icon-product-asset-tracking',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Asset Tracking',
          link: '/asset-tracking',
        },
      ],
    },
    {
      name: 'Track',
      pages: [
        {
          name: 'Using the example apps',
          link: '/asset-tracking/example-apps',
        },
        {
          name: 'Using the SDKs',
          link: '/asset-tracking/using-the-sdks',
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
