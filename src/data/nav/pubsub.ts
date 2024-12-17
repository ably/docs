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
          showLanguageSelector: true,
        },
        {
          name: 'How to use Ably',
          link: '/basics/use-ably',
          showLanguageSelector: true,
        },
      ],
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'Quickstart guide',
          link: '/getting-started/quickstart',
          showLanguageSelector: true,
        },
        {
          name: 'SDK setup',
          link: '/getting-started/setup',
          showLanguageSelector: true,
        },
        {
          name: 'React Hooks',
          link: '/getting-started/react',
          showLanguageSelector: true,
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
          showLanguageSelector: true,
        },
        {
          name: 'Token auth',
          link: '/auth/token',
          showLanguageSelector: true,
        },
        {
          name: 'Token revocation',
          link: '/auth/revocation',
          showLanguageSelector: true,
        },
        {
          name: 'Identified clients',
          link: '/auth/identified-clients',
          showLanguageSelector: true,
        },
        {
          name: 'Capabilities',
          link: '/auth/capabilities',
          showLanguageSelector: true,
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
          showLanguageSelector: true,
        },
      ],
    },
    {
      name: 'Pub/Sub channels',
      pages: [
        {
          name: 'Channels',
          link: '/channels',
          showLanguageSelector: true,
        },
        {
          name: 'Messages',
          link: '/channels/messages',
          showLanguageSelector: true,
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
              showLanguageSelector: true,
            },
            {
              name: 'Deltas',
              link: '/channels/options/deltas',
              showLanguageSelector: true,
            },
            {
              name: 'Encryption',
              link: '/channels/options/encryption',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'How-to: publish and subscribe to channels',
          link: '/how-to/pub-sub',
          showLanguageSelector: true,
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
          showLanguageSelector: true,
        },
        {
          name: 'Occupancy',
          link: '/presence-occupancy/occupancy',
          showLanguageSelector: true,
        },
      ],
    },
    {
      name: 'Message storage and history',
      pages: [
        {
          name: 'Message storage',
          link: '/storage-history/storage',
          showLanguageSelector: true,
        },
        {
          name: 'History',
          link: '/storage-history/history',
          showLanguageSelector: true,
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
              showLanguageSelector: true,
            },
            {
              name: 'Browsers',
              link: '/push/configure/web',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'Publish',
          link: '/push/publish',
          showLanguageSelector: true,
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
              showLanguageSelector: true,
            },
            {
              name: 'Metadata REST requests',
              link: '/metadata-stats/metadata/rest',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'Statistics',
          link: '/metadata-stats/stats',
          showLanguageSelector: true,
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
              showLanguageSelector: true,
            },
            {
              name: 'Azure Functions',
              link: '/general/webhooks/azure',
              showLanguageSelector: true,
            },
            {
              name: 'Google Cloud Functions',
              link: '/general/webhooks/google-functions',
              showLanguageSelector: true,
            },
            {
              name: 'Zapier',
              link: '/general/webhooks/zapier',
              showLanguageSelector: true,
            },
            {
              name: 'Cloudflare Workers',
              link: '/general/webhooks/cloudflare',
              showLanguageSelector: true,
            },
            {
              name: 'IFTTT',
              link: '/general/webhooks/ifttt',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'Message Queues',
          link: '/general/queues',
          showLanguageSelector: true,
        },
        {
          name: 'Kafka Connector',
          link: '/general/kafka-connector',
          showLanguageSelector: true,
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
              showLanguageSelector: true,
            },
            {
              name: 'Kinesis Rule',
              link: '/general/firehose/kinesis-rule',
              showLanguageSelector: true,
            },
            {
              name: 'AMQP Rule',
              link: '/general/firehose/amqp-rule',
              showLanguageSelector: true,
            },
            {
              name: 'SQS Rule',
              link: '/general/firehose/sqs-rule',
              showLanguageSelector: true,
            },
            {
              name: 'Pulsar Rule',
              link: '/general/firehose/pulsar-rule',
              showLanguageSelector: true,
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
          showLanguageSelector: true,
        },
        {
          name: 'MQTT',
          link: '/protocols/mqtt',
          showLanguageSelector: true,
        },
        {
          name: 'Pusher Adapter',
          link: '/protocols/pusher',
          showLanguageSelector: true,
        },
        {
          name: 'PubNub Adapter',
          link: '/protocols/pubnub',
          showLanguageSelector: true,
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
        { name: 'User management', link: '/account/users', showLanguageSelector: true },
        { name: 'Organizations', link: '/account/organizations', showLanguageSelector: true },
        { name: 'Single sign-on (SSO)', link: '/account/sso', showLanguageSelector: true },
        { name: 'Two-factor authentication (2FA)', link: '/account/2fa', showLanguageSelector: true },
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
              showLanguageSelector: true,
            },
            {
              name: 'API keys',
              link: '/account/app/api',
              showLanguageSelector: true,
            },
            {
              name: 'Queues',
              link: '/account/app/queues',
              showLanguageSelector: true,
            },
            {
              name: 'Notifications',
              link: '/account/app/notifications',
              showLanguageSelector: true,
            },
            {
              name: 'Dev console',
              link: '/account/app/console',
              showLanguageSelector: true,
            },
            {
              name: 'Settings',
              link: '/account/app/settings',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'Programmatic management with Control API',
          link: '/account/control-api',
          showLanguageSelector: true,
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
              showLanguageSelector: true,
            },
            {
              name: 'Standard',
              link: '/pricing/standard',
              showLanguageSelector: true,
            },
            {
              name: 'Pro',
              link: '/pricing/pro',
              showLanguageSelector: true,
            },
            {
              name: 'Enterprise',
              link: '/pricing/enterprise',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'Billing',
          link: '/pricing/billing',
          showLanguageSelector: true,
        },
        {
          name: 'Limits',
          link: '/pricing/limits',
          showLanguageSelector: true,
        },
        {
          name: 'Pricing FAQs',
          link: '/pricing/faqs',
          showLanguageSelector: true,
        },
      ],
    },
    {
      name: 'Further Reading',
      pages: [
        {
          name: 'API References',
          link: '/api',
          showLanguageSelector: true,
        },
        {
          name: 'Glossary',
          link: '/glossary',
          showLanguageSelector: true,
        },
        {
          name: 'Platform Customization',
          link: '/platform-customization',
          showLanguageSelector: true,
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
              showLanguageSelector: true,
            },
            {
              name: 'Connection',
              link: '/api/realtime-sdk/connection',
              showLanguageSelector: true,
            },
            {
              name: 'Channels',
              link: '/api/realtime-sdk/channels',
              showLanguageSelector: true,
            },
            {
              name: 'Channel Metadata',
              link: '/api/realtime-sdk/channel-metadata',
              showLanguageSelector: true,
            },
            {
              name: 'Messages',
              link: '/api/realtime-sdk/messages',
              showLanguageSelector: true,
            },
            {
              name: 'Presence',
              link: '/api/realtime-sdk/presence',
              showLanguageSelector: true,
            },
            {
              name: 'Authentication',
              link: '/api/realtime-sdk/authentication',
              showLanguageSelector: true,
            },
            {
              name: 'History',
              link: '/api/realtime-sdk/history',
              showLanguageSelector: true,
            },
            {
              name: 'Push Notifications - Admin',
              link: '/api/realtime-sdk/push-admin',
              showLanguageSelector: true,
            },
            {
              name: 'Push Notifications - Devices',
              link: '/api/realtime-sdk/push',
              showLanguageSelector: true,
            },
            {
              name: 'Encryption',
              link: '/api/realtime-sdk/encryption',
              showLanguageSelector: true,
            },
            {
              name: 'Statistics',
              link: '/api/realtime-sdk/statistics',
              showLanguageSelector: true,
            },
            {
              name: 'Types',
              link: '/api/realtime-sdk/types',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'REST SDK',
          pages: [
            {
              name: 'Constructor',
              link: '/api/rest-sdk',
              showLanguageSelector: true,
            },
            {
              name: 'Channels',
              link: '/api/rest-sdk/channels',
              showLanguageSelector: true,
            },
            {
              name: 'Channel Status',
              link: '/api/rest-sdk/channel-status',
              showLanguageSelector: true,
            },
            {
              name: 'Messages',
              link: '/api/rest-sdk/messages',
              showLanguageSelector: true,
            },
            {
              name: 'Presence',
              link: '/api/rest-sdk/presence',
              showLanguageSelector: true,
            },
            {
              name: 'Authentication',
              link: '/api/rest-sdk/authentication',
              showLanguageSelector: true,
            },
            {
              name: 'History',
              link: '/api/rest-sdk/history',
              showLanguageSelector: true,
            },
            {
              name: 'Push Notifications - Admin',
              link: '/api/rest-sdk/push-admin',
              showLanguageSelector: true,
            },
            {
              name: 'Encryption',
              link: '/api/rest-sdk/encryption',
              showLanguageSelector: true,
            },
            {
              name: 'Statistics',
              link: '/api/rest-sdk/statistics',
              showLanguageSelector: true,
            },
            {
              name: 'Types',
              link: '/api/rest-sdk/types',
              showLanguageSelector: true,
            },
          ],
        },
        {
          name: 'REST API',
          link: '/api/rest-api',
          showLanguageSelector: true,
        },
        {
          name: 'SSE API',
          link: '/api/sse',
          showLanguageSelector: true,
        },
        {
          name: 'Control API',
          link: '/api/control-api',
          showLanguageSelector: true,
        },
      ],
    },
  ],
  showJumpLink: true,
} satisfies NavProduct;
