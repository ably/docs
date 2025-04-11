import { NavProduct } from './types';

export default {
  name: 'Ably LiveObjects',
  link: '/docs/liveobjects',
  icon: {
    closed: 'icon-product-liveobjects-mono',
    open: 'icon-product-liveobjects',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About LiveObjects',
          link: '/docs/liveobjects',
        },
      ],
    },
    {
      name: 'Get started',
      pages: [
        {
          name: 'Quickstart',
          link: '/docs/liveobjects/quickstart',
        },
      ],
    },
    {
      name: 'LiveObjects features',
      pages: [
        {
          name: 'LiveCounter',
          link: '/docs/liveobjects/counter',
        },
        {
          name: 'LiveMap',
          link: '/docs/liveobjects/map',
        },
      ],
    },
    {
      name: 'Advanced',
      pages: [
        {
          name: 'Batch operations',
          link: '/docs/liveobjects/batch',
        },
        {
          name: 'Lifecycle events',
          link: '/docs/liveobjects/lifecycle',
        },
        {
          name: 'Typing',
          link: '/docs/liveobjects/typing',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: '/docs/liveobjects/rest-api',
          name: 'REST API',
        },
        {
          link: 'https://ably.com/docs/sdk/js/v2.0/interfaces/ably.Objects.html',
          name: 'JavaScript SDK',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;
