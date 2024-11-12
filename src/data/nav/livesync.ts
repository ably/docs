import { NavProduct } from './types';

export default {
  name: 'Ably LiveSync',
  icon: {
    closed: 'icon-product-livesync-mono',
    open: 'icon-product-livesync',
  },
  content: [
    {
      name: 'LiveSync',
      pages: [
        {
          name: 'How LiveSync works',
          link: '/livesync/',
        },
        {
          name: 'Quickstart',
          link: '/livesync/quickstart',
        },
        {
          name: 'Frontend data models',
          link: '/livesync/models',
        },
        {
          name: 'Database Connector',
          link: '/livesync/database-connector',
        },
        {
          name: 'Outbox and nodes tables',
          link: '/livesync/outbox-nodes-tables',
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
          name: 'SDK',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;
