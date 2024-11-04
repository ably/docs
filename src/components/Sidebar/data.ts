import { NavData } from './types';

export default {
  platform: {
    name: 'Platform',
    icon: {
      closed: 'icon-product-platform-mono',
      open: 'icon-product-platform-mono',
    },
    content: [
      {
        name: 'Pricing',
        pages: [
          {
            link: '/pricing',
            name: 'Pricing',
          },
          {
            name: 'Hello',
            pages: [
              {
                link: '/pricing/free',
                name: 'Pricing Free',
              },
              {
                link: '/pricing/standard',
                name: 'Pricing Standard',
              },
              {
                link: '/pricing/pro',
                name: 'Pricing Pro',
              },
              {
                link: '/pricing/enterprise',
                name: 'Pricing Enterprise',
              },
            ],
          },
          {
            link: '/pricing/billing',
            name: 'Pricing Billing',
          },
          {
            link: '/pricing/limits',
            name: 'Pricing Limits',
          },
          {
            link: '/pricing/faqs',
            name: 'Pricing Faqs',
          },
        ],
      },
      {
        name: 'Integrations',
        pages: [
          {
            link: '/pricing',
            name: 'Pricing',
          },
          {
            name: 'Hello',
            pages: [
              {
                link: '/pricing/standard',
                name: 'Pricing Standard',
              },
              {
                link: '/pricing/pro',
                name: 'Pricing Pro',
              },
              {
                link: '/pricing/enterprise',
                name: 'Pricing Enterprise',
              },
            ],
          },
          {
            link: '/pricing/billing',
            name: 'Pricing Billing',
          },
          {
            link: '/pricing/limits',
            name: 'Pricing Limits',
          },
          {
            link: '/pricing/faqs',
            name: 'Pricing Faqs',
          },
        ],
      },
      {
        name: 'Pricing',
        pages: [
          {
            link: '/pricing',
            name: 'Pricing',
          },
          {
            name: 'Hello',
            pages: [
              {
                link: '/pricing/standard',
                name: 'Pricing Standard',
              },
              {
                link: '/pricing/pro',
                name: 'Pricing Pro',
              },
              {
                link: '/pricing/enterprise',
                name: 'Pricing Enterprise',
              },
            ],
          },
          {
            link: '/pricing/billing',
            name: 'Pricing Billing',
          },
          {
            link: '/pricing/limits',
            name: 'Pricing Limits',
          },
          {
            link: '/pricing/faqs',
            name: 'Pricing Faqs',
          },
        ],
      },
    ],
  },
  pubsub: {
    name: 'Ably Pub/Sub',
    icon: {
      closed: 'icon-product-pub-sub-mono',
      open: 'icon-product-pubsub',
    },
    content: [
      {
        name: 'Get started',
        pages: [
          {
            name: 'Quickstart',
            link: '/getting-started/quickstart',
          },
          {
            name: 'SDK Setup',
            link: '/getting-started/setup',
          },
          {
            name: 'React SDK',
            link: '/getting-started/react',
          },
        ],
      },
      {
        name: 'Authentication',
        pages: [
          {
            link: '/auth',
            name: 'Auth',
          },
          {
            link: '/auth/basic',
            name: 'Auth Basic',
          },
          {
            link: '/auth/token',
            name: 'Auth Token',
          },
          {
            link: '/auth/identified-clients',
            name: 'Auth Identified Clients',
          },
          {
            link: '/auth/capabilities',
            name: 'Auth Capabilities',
          },
        ],
      },
      {
        name: 'Connections',
        pages: [
          {
            link: '/connect',
            name: 'Connect',
          },
          {
            link: '/connect/states',
            name: 'Connect States',
          },
        ],
      },
      {
        name: 'Channels and messages',
        pages: [
          {
            link: '/channels',
            name: 'Channels',
          },
          {
            link: '/channels/messages',
            name: 'Channels Messages',
          },
          {
            name: 'Channel options',
            pages: [
              {
                link: '/channels/options',
                name: 'Channels Options',
              },
              {
                link: '/channels/options/rewind',
                name: 'Channels Options Rewind',
              },
              {
                link: '/channels/options/deltas',
                name: 'Channels Options Deltas',
              },
              {
                link: '/channels/options/encryption',
                name: 'Channels Options Encryption',
              },
              {
                link: '/how-to/pub-sub',
                name: 'How To Pub Sub',
              },
            ],
          },
        ],
      },
      {
        name: 'Presence and occupancy',
        pages: [
          {
            link: '/presence-occupancy',
            name: 'Presence Occupancy',
          },
          {
            link: '/presence-occupancy/presence',
            name: 'Presence Occupancy Presence',
          },
          {
            link: '/presence-occupancy/occupancy',
            name: 'Presence Occupancy Occupancy',
          },
        ],
      },
      {
        name: 'Message storage',
        pages: [
          {
            link: '/storage-history/storage',
            name: 'Storage History Storage',
          },
          {
            link: '/storage-history/history',
            name: 'Storage History History',
          },
        ],
      },
      {
        name: 'Metadata',
        pages: [
          {
            link: '/metadata-stats/metadata/subscribe',
            name: 'Metadata Stats Metadata Subscribe',
          },
          {
            link: '/metadata-stats/metadata/rest',
            name: 'Metadata Stats Metadata Rest',
          },
        ],
      },
      {
        name: 'Push notifications',
        pages: [
          {
            link: '/push',
            name: 'Push',
          },
          {
            name: 'Configure and activate',
            pages: [
              {
                link: '/push/configure/device',
                name: 'Push Configure Device',
              },
              {
                link: '/push/configure/web',
                name: 'Push Configure Web',
              },
            ],
          },
          {
            link: '/push/publish',
            name: 'Push Publish',
          },
        ],
      },
      {
        name: 'Supported protocols',
        pages: [
          {
            link: '/protocols',
            name: 'Protocols',
          },
          {
            link: '/protocols/sse',
            name: 'Protocols SSE',
          },
          {
            link: '/protocols/mqtt',
            name: 'Protocols MQTT',
          },
          {
            link: '/protocols/pusher',
            name: 'Protocols Pusher',
          },
          {
            link: '/protocols/pubnub',
            name: 'Protocols Pubnub',
          },
        ],
      },
    ],
  },
} satisfies NavData;
