import { NavProduct } from './types';

export default {
  name: 'Ably Pub/Sub',
  link: '/docs/products/channels',
  icon: {
    closed: 'icon-product-pubsub-mono',
    open: 'icon-product-pubsub',
  },
  content: [
    {
      name: 'Basics',
      pages: [
        {
          name: 'What is Ably?',
          link: '/docs/basics/ably',
        },
        {
          name: 'How to use Ably',
          link: '/docs/basics/use-ably',
        },
      ],
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'Quickstart guide',
          link: '/docs/getting-started/quickstart',
        },
        {
          name: 'SDK setup',
          link: '/docs/getting-started/setup',
        },
        {
          name: 'React Hooks',
          link: '/docs/getting-started/react',
        },
      ],
    },
    {
      name: 'Authentication',
      pages: [
        {
          name: 'Overview',
          link: '/docs/auth',
        },
        {
          name: 'Basic auth',
          link: '/docs/auth/basic',
        },
        {
          name: 'Token auth',
          link: '/docs/auth/token',
        },
        {
          name: 'Token revocation',
          link: '/docs/auth/revocation',
        },
        {
          name: 'Identified clients',
          link: '/docs/auth/identified-clients',
        },
        {
          name: 'Capabilities',
          link: '/docs/auth/capabilities',
        },
      ],
    },
    {
      name: 'Connections',
      pages: [
        {
          name: 'Overview',
          link: '/docs/connect',
        },
        {
          name: 'Connection state and recovery',
          link: '/docs/connect/states',
        },
      ],
    },
    {
      name: 'Pub/Sub channels',
      pages: [
        {
          name: 'Channels',
          link: '/docs/channels',
          indexPage: true,
        },
        {
          name: 'Messages',
          link: '/docs/channels/messages',
        },
        {
          name: 'Channel options',
          pages: [
            {
              name: 'Overview',
              link: '/docs/channels/options',
            },
            {
              name: 'Rewind',
              link: '/docs/channels/options/rewind',
            },
            {
              name: 'Deltas',
              link: '/docs/channels/options/deltas',
            },
            {
              name: 'Encryption',
              link: '/docs/channels/options/encryption',
            },
          ],
        },
        {
          name: 'How-to: publish and subscribe to channels',
          link: '/docs/how-to/pub-sub',
        },
      ],
    },
    {
      name: 'Presence and occupancy',
      pages: [
        {
          name: 'Overview',
          link: '/docs/presence-occupancy',
        },
        {
          name: 'Presence',
          link: '/docs/presence-occupancy/presence',
        },
        {
          name: 'Occupancy',
          link: '/docs/presence-occupancy/occupancy',
        },
      ],
    },
    {
      name: 'Message storage',
      pages: [
        {
          name: 'Message storage',
          link: '/docs/storage-history/storage',
        },
        {
          name: 'Message history',
          link: '/docs/storage-history/history',
        },
      ],
    },
    {
      name: 'Push notifications',
      pages: [
        {
          name: 'Overview',
          link: '/docs/push',
        },
        {
          name: 'Configure and activate',
          pages: [
            {
              name: 'Devices',
              link: '/docs/push/configure/device',
            },
            {
              name: 'Browsers',
              link: '/docs/push/configure/web',
            },
          ],
        },
        {
          name: 'Publish',
          link: '/docs/push/publish',
        },
      ],
    },
    {
      name: 'Metadata and statistics',
      pages: [
        {
          name: 'Metadata',
          pages: [
            {
              name: 'Metadata subscriptions',
              link: '/docs/metadata-stats/metadata/subscribe',
            },
            {
              name: 'Metadata REST requests',
              link: '/docs/metadata-stats/metadata/rest',
            },
          ],
        },
        {
          name: 'Statistics',
          link: '/docs/metadata-stats/stats',
        },
      ],
    },
    {
      name: 'Supported protocols',
      pages: [
        {
          name: 'Overview',
          link: '/docs/protocols',
        },
        {
          name: 'Server-Sent Events (SSE)',
          link: '/docs/protocols/sse',
        },
        {
          name: 'MQTT',
          link: '/docs/protocols/mqtt',
        },
        {
          name: 'Pusher Adapter',
          link: '/docs/protocols/pusher',
        },
        {
          name: 'PubNub Adapter',
          link: '/docs/protocols/pubnub',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          name: 'Overview',
          link: '/docs/api',
        },
        {
          name: 'Realtime SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/docs/api/realtime-sdk',
            },
            {
              name: 'Connection',
              link: '/docs/api/realtime-sdk/connection',
            },
            {
              name: 'Channels',
              link: '/docs/api/realtime-sdk/channels',
            },
            {
              name: 'Channel Metadata',
              link: '/docs/api/realtime-sdk/channel-metadata',
            },
            {
              name: 'Messages',
              link: '/docs/api/realtime-sdk/messages',
            },
            {
              name: 'Presence',
              link: '/docs/api/realtime-sdk/presence',
            },
            {
              name: 'Authentication',
              link: '/docs/api/realtime-sdk/authentication',
            },
            {
              name: 'History',
              link: '/docs/api/realtime-sdk/history',
            },
            {
              name: 'Push Notifications - Admin',
              link: '/docs/api/realtime-sdk/push-admin',
            },
            {
              name: 'Push Notifications - Devices',
              link: '/docs/api/realtime-sdk/push',
            },
            {
              name: 'Encryption',
              link: '/docs/api/realtime-sdk/encryption',
            },
            {
              name: 'Statistics',
              link: '/docs/api/realtime-sdk/statistics',
            },
            {
              name: 'Types',
              link: '/docs/api/realtime-sdk/types',
            },
          ],
        },
        {
          name: 'REST SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/docs/api/rest-sdk',
            },
            {
              name: 'Channels',
              link: '/docs/api/rest-sdk/channels',
            },
            {
              name: 'Channel Status',
              link: '/docs/api/rest-sdk/channel-status',
            },
            {
              name: 'Messages',
              link: '/docs/api/rest-sdk/messages',
            },
            {
              name: 'Presence',
              link: '/docs/api/rest-sdk/presence',
            },
            {
              name: 'Authentication',
              link: '/docs/api/rest-sdk/authentication',
            },
            {
              name: 'History',
              link: '/docs/api/rest-sdk/history',
            },
            {
              name: 'Push Notifications - Admin',
              link: '/docs/api/rest-sdk/push-admin',
            },
            {
              name: 'Encryption',
              link: '/docs/api/rest-sdk/encryption',
            },
            {
              name: 'Statistics',
              link: '/docs/api/rest-sdk/statistics',
            },
            {
              name: 'Types',
              link: '/docs/api/rest-sdk/types',
            },
          ],
        },
        {
          name: 'REST API',
          link: '/docs/api/rest-api',
        },
        {
          name: 'SSE API',
          link: '/docs/api/sse',
        },
      ],
    },
  ],
  showJumpLink: true,
} satisfies NavProduct;
