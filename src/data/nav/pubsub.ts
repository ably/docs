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
      name: 'Pub/Sub channels',
      pages: [
        {
          name: 'Channels',
          link: '/channels',
        },
        {
          name: 'Messages',
          link: '/channels/messages',
        },
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
          name: 'How-to: publish and subscribe to channels',
          link: '/how-to/pub-sub',
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
      name: 'Message storage and history',
      pages: [
        {
          name: 'Message storage',
          link: '/storage-history/storage',
        },
        {
          name: 'History',
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
      name: 'Integrations',
      pages: [
        {
          name: 'Overview',
          link: '/general/integrations',
        },
        {
          name: 'Events',
          pages: [
            {
              name: 'Overview',
              link: '/general/webhooks',
            },
            {
              name: 'AWS Lambda Functions',
              link: '/general/webhooks/aws-lambda',
            },
            {
              name: 'Azure Functions',
              link: '/general/webhooks/azure',
            },
            {
              name: 'Google Cloud Functions',
              link: '/general/webhooks/google-functions',
            },
            {
              name: 'Zapier',
              link: '/general/webhooks/zapier',
            },
            {
              name: 'Cloudflare Workers',
              link: '/general/webhooks/cloudflare',
            },
            {
              name: 'IFTTT',
              link: '/general/webhooks/ifttt',
            },
          ],
        },
        {
          name: 'Message Queues',
          link: '/general/queues',
        },
        {
          name: 'Kafka Connector',
          link: '/general/kafka-connector',
        },
        {
          name: 'Firehose',
          pages: [
            {
              name: 'Overview',
              link: '/general/firehose',
            },
            {
              name: 'Kafka Rule',
              link: '/general/firehose/kafka-rule',
            },
            {
              name: 'Kinesis Rule',
              link: '/general/firehose/kinesis-rule',
            },
            {
              name: 'AMQP Rule',
              link: '/general/firehose/amqp-rule',
            },
            {
              name: 'SQS Rule',
              link: '/general/firehose/sqs-rule',
            },
            {
              name: 'Pulsar Rule',
              link: '/general/firehose/pulsar-rule',
            },
          ],
        },
      ],
    },
    {
      name: 'Other protocols',
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
    {
      name: 'Ably accounts and apps',
      pages: [
        {
          name: 'Account overview',
          link: '/account',
        },
        { name: 'User management', link: '/account/users' },
        { name: 'Organizations', link: '/account/organizations' },
        { name: 'Single sign-on (SSO)', link: '/account/sso' },
        { name: 'Two-factor authentication (2FA)', link: '/account/2fa' },
        {
          name: 'App management',
          pages: [
            {
              name: 'Overview',
              link: '/account/app',
            },
            {
              name: 'Stats',
              link: '/account/app/stats',
            },
            {
              name: 'API keys',
              link: '/account/app/api',
            },
            {
              name: 'Queues',
              link: '/account/app/queues',
            },
            {
              name: 'Notifications',
              link: '/account/app/notifications',
            },
            {
              name: 'Dev console',
              link: '/account/app/console',
            },
            {
              name: 'Settings',
              link: '/account/app/settings',
            },
          ],
        },
        {
          name: 'Programmatic management with Control API',
          link: '/account/control-api',
        },
      ],
    },
    {
      name: 'Pricing',
      pages: [
        {
          name: 'Overview',
          link: '/pricing',
        },
        {
          name: 'Package types',
          pages: [
            {
              name: 'Free',
              link: '/pricing/free',
            },
            {
              name: 'Standard',
              link: '/pricing/standard',
            },
            {
              name: 'Pro',
              link: '/pricing/pro',
            },
            {
              name: 'Enterprise',
              link: '/pricing/enterprise',
            },
          ],
        },
        {
          name: 'Billing',
          link: '/pricing/billing',
        },
        {
          name: 'Limits',
          link: '/pricing/limits',
        },
        {
          name: 'Pricing FAQs',
          link: '/pricing/faqs',
        },
      ],
    },
    {
      name: 'Further Reading',
      pages: [
        {
          name: 'API References',
          link: '/api',
        },
        {
          name: 'Glossary',
          link: '/glossary',
        },
        {
          name: 'Platform Customization',
          link: '/platform-customization',
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
        {
          name: 'Control API',
          link: '/api/control-api',
        },
      ],
    },
  ],
  showJumpLink: true,
} satisfies NavProduct;
