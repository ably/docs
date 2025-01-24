import { NavProduct } from './types';

export default {
  name: 'Ably Pub/Sub',
  link: '/products/channels',
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
          link: '/basics/ably',
        },
        {
          name: 'How to use Ably',
          link: '/basics/use-ably',
        },
      ],
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'Quickstart guide',
          link: '/getting-started/quickstart',
        },
        {
          name: 'SDK setup',
          link: '/getting-started/setup',
        },
        {
          name: 'React Hooks',
          link: '/getting-started/react',
        },
      ],
    },
    {
      name: 'Authentication',
      pages: [
        {
          name: 'Overview',
          link: '/auth',
        },
        {
          name: 'Basic auth',
          link: '/auth/basic',
        },
        {
          name: 'Token auth',
          link: '/auth/token',
        },
        {
          name: 'Token revocation',
          link: '/auth/revocation',
        },
        {
          name: 'Identified clients',
          link: '/auth/identified-clients',
        },
        {
          name: 'Capabilities',
          link: '/auth/capabilities',
        },
      ],
    },
    {
      name: 'Connections',
      pages: [
        {
          name: 'Overview',
          link: '/connect',
        },
        {
          name: 'Connection state and recovery',
          link: '/connect/states',
        },
      ],
    },
    {
      name: 'Publish and subscribe',
      pages: [
        {
          name: 'Basic pub-sub',
          link: '/pub-sub',
          indexPage: true,
        },
        {
          name: 'Advanced pub-sub',
          link: '/pub-sub/advanced',
        },
      ],
    },
    {
      name: 'Channels',
      pages: [
        { name: 'Channel concepts', link: '/channels' },
        { name: 'Channel states', link: '/channels/states' },
        {
          name: 'Channel options',
          pages: [
            {
              name: 'Overview',
              link: '/channels/options',
            },
            {
              name: 'Rewind',
              link: '/channels/options/rewind',
            },
            {
              name: 'Deltas',
              link: '/channels/options/deltas',
            },
            {
              name: 'Encryption',
              link: '/channels/options/encryption',
            },
          ],
        },
        {
          name: 'Messages',
          link: '/how-to/pub-sub',
          pages: [
            {
              name: 'Message concepts',
              link: '/messages',
            },
            {
              name: 'Message batching',
              link: '/messages/batch',
            },
          ],
        },
      ],
    },
    {
      name: 'Presence and occupancy',
      pages: [
        {
          name: 'Overview',
          link: '/presence-occupancy',
        },
        {
          name: 'Presence',
          link: '/presence-occupancy/presence',
        },
        {
          name: 'Occupancy',
          link: '/presence-occupancy/occupancy',
        },
      ],
    },
    {
      name: 'Message storage',
      pages: [
        {
          name: 'Message storage',
          link: '/storage-history/storage',
        },
        {
          name: 'Message history',
          link: '/storage-history/history',
        },
      ],
    },
    {
      name: 'Push notifications',
      pages: [
        {
          name: 'Overview',
          link: '/push',
        },
        {
          name: 'Configure and activate',
          pages: [
            {
              name: 'Devices',
              link: '/push/configure/device',
            },
            {
              name: 'Browsers',
              link: '/push/configure/web',
            },
          ],
        },
        {
          name: 'Publish',
          link: '/push/publish',
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
              link: '/metadata-stats/metadata/subscribe',
            },
            {
              name: 'Metadata REST requests',
              link: '/metadata-stats/metadata/rest',
            },
          ],
        },
        {
          name: 'Statistics',
          link: '/metadata-stats/stats',
        },
      ],
    },
    {
      name: 'Supported protocols',
      pages: [
        {
          name: 'Overview',
          link: '/protocols',
        },
        {
          name: 'Server-Sent Events (SSE)',
          link: '/protocols/sse',
        },
        {
          name: 'MQTT',
          link: '/protocols/mqtt',
        },
        {
          name: 'Pusher Adapter',
          link: '/protocols/pusher',
        },
        {
          name: 'PubNub Adapter',
          link: '/protocols/pubnub',
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
          link: '/api',
        },
        {
          name: 'Realtime SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/api/realtime-sdk',
            },
            {
              name: 'Connection',
              link: '/api/realtime-sdk/connection',
            },
            {
              name: 'Channels',
              link: '/api/realtime-sdk/channels',
            },
            {
              name: 'Channel Metadata',
              link: '/api/realtime-sdk/channel-metadata',
            },
            {
              name: 'Messages',
              link: '/api/realtime-sdk/messages',
            },
            {
              name: 'Presence',
              link: '/api/realtime-sdk/presence',
            },
            {
              name: 'Authentication',
              link: '/api/realtime-sdk/authentication',
            },
            {
              name: 'History',
              link: '/api/realtime-sdk/history',
            },
            {
              name: 'Push Notifications - Admin',
              link: '/api/realtime-sdk/push-admin',
            },
            {
              name: 'Push Notifications - Devices',
              link: '/api/realtime-sdk/push',
            },
            {
              name: 'Encryption',
              link: '/api/realtime-sdk/encryption',
            },
            {
              name: 'Statistics',
              link: '/api/realtime-sdk/statistics',
            },
            {
              name: 'Types',
              link: '/api/realtime-sdk/types',
            },
          ],
        },
        {
          name: 'REST SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/api/rest-sdk',
            },
            {
              name: 'Channels',
              link: '/api/rest-sdk/channels',
            },
            {
              name: 'Channel Status',
              link: '/api/rest-sdk/channel-status',
            },
            {
              name: 'Messages',
              link: '/api/rest-sdk/messages',
            },
            {
              name: 'Presence',
              link: '/api/rest-sdk/presence',
            },
            {
              name: 'Authentication',
              link: '/api/rest-sdk/authentication',
            },
            {
              name: 'History',
              link: '/api/rest-sdk/history',
            },
            {
              name: 'Push Notifications - Admin',
              link: '/api/rest-sdk/push-admin',
            },
            {
              name: 'Encryption',
              link: '/api/rest-sdk/encryption',
            },
            {
              name: 'Statistics',
              link: '/api/rest-sdk/statistics',
            },
            {
              name: 'Types',
              link: '/api/rest-sdk/types',
            },
          ],
        },
        {
          name: 'REST API',
          link: '/api/rest-api',
        },
        {
          name: 'SSE API',
          link: '/api/sse',
        },
      ],
    },
  ],
  showJumpLink: true,
} satisfies NavProduct;
