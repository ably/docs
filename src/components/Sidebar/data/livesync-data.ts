import { NavProduct } from '../types';

export default {
  name: 'LiveSync',
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
} satisfies NavProduct;
