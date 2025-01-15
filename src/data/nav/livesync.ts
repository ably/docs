import { NavProduct } from './types';

export default {
  name: 'Ably LiveSync',
  link: '/docs/livesync',
  icon: {
    closed: 'icon-product-livesync-mono',
    open: 'icon-product-livesync',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About LiveSync',
          link: '/docs/livesync',
        },
      ],
    },
    {
      name: 'MongoDB',
      pages: [
        {
          name: 'MongoDB database connector',
          link: '/docs/livesync/mongodb',
        },
      ],
    },
    {
      name: 'Postgres',
      pages: [
        {
          name: 'Postgres database connector',
          link: '/docs/livesync/postgres',
        },
        {
          name: 'Frontend data models',
          link: '/docs/livesync/postgres/models',
        },
        {
          name: 'Quickstart',
          link: '/docs/livesync/postgres/quickstart',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: 'https://sdk.ably.com/builds/ably-labs/models/main/typedoc/index.html',
          name: 'JavaScript',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;
