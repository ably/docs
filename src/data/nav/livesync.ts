import { NavProduct } from './types';

export default {
  name: 'Ably LiveSync',
  link: '/docs/livesync',
  icon: {
    closed: 'icon-gui-prod-livesync-outline',
    open: 'icon-gui-prod-livesync-solid',
  },
  content: [
    {
      name: 'About LiveSync',
      link: '/docs/livesync',
      index: true,
    },
    {
      name: 'MongoDB',
      expand: true,
      pages: [
        {
          name: 'MongoDB database connector',
          link: '/docs/livesync/mongodb',
          index: true,
        },
      ],
    },
    {
      name: 'Postgres',
      expand: true,
      pages: [
        {
          name: 'Postgres database connector',
          link: '/docs/livesync/postgres',
          index: true,
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
      name: 'API references',
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
