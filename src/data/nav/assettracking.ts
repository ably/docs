import { NavProduct } from './types';

export default {
  name: 'Ably Asset Tracking',
  link: '/docs/products/asset-tracking',
  icon: {
    closed: 'icon-product-asset-tracking-mono',
    open: 'icon-product-asset-tracking',
  },
  content: [
    {
      name: 'Asset Tracking',
      pages: [
        {
          name: 'What is Asset Tracking?',
          link: '/docs/asset-tracking/',
        },
        {
          name: 'Using the example apps',
          link: '/docs/asset-tracking/example-apps',
        },
        {
          name: 'Using the SDKs',
          link: '/docs/asset-tracking/using-the-sdks',
        },
      ],
    },
  ],
  api: [],
} satisfies NavProduct;
