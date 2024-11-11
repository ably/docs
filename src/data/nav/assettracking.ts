import { NavProduct } from './types';

export default {
  name: 'Asset Tracking',
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
          link: '/asset-tracking',
        },
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
  api: [],
} satisfies NavProduct;
