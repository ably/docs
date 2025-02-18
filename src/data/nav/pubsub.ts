import { NavProduct } from './types';

export default {
  name: 'Ably Pub/Sub',
  icon: {
    closed: 'icon-product-pubsub-mono',
    open: 'icon-product-pubsub',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Pub/Sub',
          link: '/basics',
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
        {
          name: 'How-to: Publish and subscribe',
          link: '/how-to/pub-sub',
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
      ],
    },
    {
      name: 'Messages',
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
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Connection',
              link: '/api/realtime-sdk/connection',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Channels',
              link: '/api/realtime-sdk/channels',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Channel Metadata',
              link: '/api/realtime-sdk/channel-metadata',
            },
            {
              name: 'Messages',
              link: '/api/realtime-sdk/messages',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Presence',
              link: '/api/realtime-sdk/presence',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Authentication',
              link: '/api/realtime-sdk/authentication',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'History',
              link: '/api/realtime-sdk/history',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Push Notifications - Admin',
              link: '/api/realtime-sdk/push-admin',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'python', 'android'],
            },
            {
              name: 'Push Notifications - Devices',
              link: '/api/realtime-sdk/push',
              languages: ['swift', 'objc', 'android'],
            },
            {
              name: 'Encryption',
              link: '/api/realtime-sdk/encryption',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Statistics',
              link: '/api/realtime-sdk/statistics',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Types',
              link: '/api/realtime-sdk/types',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter', 'go'],
            },
          ],
        },
        {
          name: 'REST SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/api/rest-sdk',
              languages: [
                'javascript',
                'nodejs',
                'ruby',
                'java',
                'swift',
                'objc',
                'csharp',
                'flutter',
                'go',
                'python',
                'php',
              ],
            },
            {
              name: 'Channels',
              link: '/api/rest-sdk/channels',
              languages: [
                'javascript',
                'nodejs',
                'ruby',
                'java',
                'swift',
                'objc',
                'csharp',
                'flutter',
                'go',
                'python',
                'php',
              ],
            },
            {
              name: 'Channel Status',
              link: '/api/rest-sdk/channel-status',
            },
            {
              name: 'Messages',
              link: '/api/rest-sdk/messages',
              languages: [
                'javascript',
                'nodejs',
                'ruby',
                'java',
                'swift',
                'objc',
                'csharp',
                'flutter',
                'go',
                'python',
                'php',
              ],
            },
            {
              name: 'Presence',
              link: '/api/rest-sdk/presence',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Authentication',
              link: '/api/rest-sdk/authentication',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'History',
              link: '/api/rest-sdk/history',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Push Notifications - Admin',
              link: '/api/rest-sdk/push-admin',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'php', 'android'],
            },
            {
              name: 'Encryption',
              link: '/api/rest-sdk/encryption',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Statistics',
              link: '/api/rest-sdk/statistics',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Types',
              link: '/api/rest-sdk/types',
              languages: [
                'javascript',
                'nodejs',
                'ruby',
                'java',
                'swift',
                'objc',
                'csharp',
                'flutter',
                'go',
                'python',
                'php',
              ],
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
