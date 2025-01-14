import { NavProduct } from './types';

export default {
  name: 'Ably LiveSync',
  icon: {
    closed: 'icon-product-livesync-mono',
    open: 'icon-product-livesync',
  },
  content: [
    {
      name: 'About',
      pages: [
        {
          name: 'How LiveSync works',
          link: '/livesync',
        },
      ],
    },
    {
      name: 'MongoDB',
      pages: [
        {
          name: 'MongoDB database conenctor',
          link: '/livesync/mongodb',
        }
      ],
    },
    {
      name: 'Postgres',
      pages: [
        {
          name: 'Postgres database connector',
          link: '/livesync/postgres',
        },
        {
          name: 'Frontend data models',
          link: '/livesync/models',
        },
        {
          name: 'Quickstart',
          link: '/livesync/quickstart',
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
