import { NavProduct } from './types';

export default {
  name: 'Ably LiveObjects',
  link: '/docs/liveobjects',
  icon: {
    closed: 'icon-gui-prod-liveobjects-outline',
    open: 'icon-gui-prod-liveobjects-solid',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About LiveObjects',
          link: '/docs/liveobjects',
          index: true,
        },
        {
          name: 'Getting started',
          link: '/docs/liveobjects/quickstart',
        },
      ],
    },
    {
      name: 'Concepts',
      pages: [
        {
          name: 'Objects',
          link: '/docs/liveobjects/concepts/objects',
        },
        {
          name: 'Operations',
          link: '/docs/liveobjects/concepts/operations',
        },
        {
          name: 'Synchronization',
          link: '/docs/liveobjects/concepts/synchronization',
        },
      ],
    },
    {
      name: 'Object Types',
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
      name: 'Features',
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
        {
          name: 'Using the REST API',
          link: '/docs/liveobjects/rest-api-usage',
          languages: ['javascript'],
        },
        {
          name: 'Inband objects',
          link: '/docs/liveobjects/inband-objects',
        },
        {
          name: 'Object storage',
          link: '/docs/liveobjects/storage',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: 'https://ably.com/docs/sdk/js/v2.0/interfaces/ably.Objects.html',
          name: 'JavaScript SDK',
          external: true,
        },
        {
          link: '/docs/api/liveobjects-rest',
          name: 'REST API',
        },
      ],
    },
  ],
} satisfies NavProduct;
