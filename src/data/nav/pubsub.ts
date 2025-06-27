import { NavProduct } from './types';

export default {
  name: 'Ably Pub/Sub',
  link: '/docs/basics',
  icon: {
    closed: 'icon-gui-prod-pubsub-outline',
    open: 'icon-gui-prod-pubsub-solid',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Pub/Sub',
          link: '/docs/basics',
          index: true,
        },
      ],
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'JavaScript',
          link: '/docs/getting-started/javascript',
        },
        {
          name: 'React',
          link: '/docs/getting-started/react',
        },
        {
          name: 'React Native',
          link: '/docs/getting-started/react-native',
        },
        {
          name: 'Kotlin',
          link: '/docs/getting-started/kotlin',
        },
        {
          name: 'Swift',
          link: '/docs/getting-started/swift',
        },
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
          link: '/docs/getting-started/react-hooks',
        },
      ],
    },
    {
      name: 'Authentication',
      pages: [
        {
          name: 'Overview',
          link: '/docs/auth',
          index: true,
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
          index: true,
        },
        {
          name: 'Connection state and recovery',
          link: '/docs/connect/states',
        },
      ],
    },
    {
      name: 'Publish and subscribe',
      pages: [
        {
          name: 'Basic pub-sub',
          link: '/docs/pub-sub',
          index: true,
        },
        {
          name: 'Advanced pub-sub',
          link: '/docs/pub-sub/advanced',
        },
      ],
    },
    {
      name: 'Channels',
      pages: [
        {
          name: 'Channel concepts',
          link: '/docs/channels',
          index: true,
        },
        { name: 'Channel states', link: '/docs/channels/states' },
        {
          name: 'Channel options',
          pages: [
            {
              name: 'Overview',
              link: '/docs/channels/options',
              index: true,
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
      ],
    },
    {
      name: 'Messages',
      pages: [
        {
          name: 'Message concepts',
          link: '/docs/messages',
          index: true,
        },
        {
          name: 'Message batching',
          link: '/docs/messages/batch',
        },
      ],
    },
    {
      name: 'Presence and occupancy',
      pages: [
        {
          name: 'Overview',
          link: '/docs/presence-occupancy',
          index: true,
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
          index: true,
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
              name: 'Overview',
              link: '/docs/metadata-stats/metadata',
              index: true,
            },
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
          index: true,
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
          index: true,
        },
        {
          name: 'Realtime SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/docs/api/realtime-sdk',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Connection',
              link: '/docs/api/realtime-sdk/connection',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Channels',
              link: '/docs/api/realtime-sdk/channels',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Channel Metadata',
              link: '/docs/api/realtime-sdk/channel-metadata',
            },
            {
              name: 'Messages',
              link: '/docs/api/realtime-sdk/messages',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter'],
            },
            {
              name: 'Presence',
              link: '/docs/api/realtime-sdk/presence',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Authentication',
              link: '/docs/api/realtime-sdk/authentication',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'History',
              link: '/docs/api/realtime-sdk/history',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Push Notifications - Admin',
              link: '/docs/api/realtime-sdk/push-admin',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'python', 'android'],
            },
            {
              name: 'Push Notifications - Devices',
              link: '/docs/api/realtime-sdk/push',
              languages: ['javascript', 'nodejs', 'swift', 'objc', 'android'],
            },
            {
              name: 'Encryption',
              link: '/docs/api/realtime-sdk/encryption',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Statistics',
              link: '/docs/api/realtime-sdk/statistics',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp'],
            },
            {
              name: 'Types',
              link: '/docs/api/realtime-sdk/types',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'flutter', 'go'],
            },
          ],
        },
        {
          name: 'REST SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/docs/api/rest-sdk',
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
              link: '/docs/api/rest-sdk/channels',
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
              link: '/docs/api/rest-sdk/channel-status',
            },
            {
              name: 'Messages',
              link: '/docs/api/rest-sdk/messages',
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
              link: '/docs/api/rest-sdk/presence',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Authentication',
              link: '/docs/api/rest-sdk/authentication',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'History',
              link: '/docs/api/rest-sdk/history',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Push Notifications - Admin',
              link: '/docs/api/rest-sdk/push-admin',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'php', 'android'],
            },
            {
              name: 'Encryption',
              link: '/docs/api/rest-sdk/encryption',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Statistics',
              link: '/docs/api/rest-sdk/statistics',
              languages: ['javascript', 'nodejs', 'ruby', 'java', 'swift', 'objc', 'csharp', 'go', 'python', 'php'],
            },
            {
              name: 'Types',
              link: '/docs/api/rest-sdk/types',
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
