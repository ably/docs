import { NavProduct } from './types';

export default {
  name: 'Platform',
  link: '/docs/platform',
  icon: {
    closed: 'icon-product-platform-mono',
    open: 'icon-product-platform',
  },
  content: [
    {
      name: 'About Ably',
      link: '/docs/platform',
      index: true,
    },
    {
      name: 'Architecture',
      pages: [
        {
          name: 'Overview',
          link: '/docs/platform/architecture',
          index: true,
        },
        {
          name: 'Edge network',
          link: '/docs/platform/architecture/edge-network',
        },
        {
          name: 'Infrastructure operations',
          link: '/docs/platform/architecture/infrastructure-operations',
        },
        {
          name: 'Fault tolerance',
          link: '/docs/platform/architecture/fault-tolerance',
        },
        {
          name: 'Performance',
          link: '/docs/platform/architecture/performance',
        },
        {
          name: 'Latency',
          link: '/docs/platform/architecture/latency',
        },
        {
          name: 'Platform scalability',
          link: '/docs/platform/architecture/platform-scalability',
        },
        {
          name: 'Connection recovery',
          link: '/docs/platform/architecture/connection-recovery',
        },
        {
          name: 'Message ordering',
          link: '/docs/platform/architecture/message-ordering',
        },
        {
          name: 'Idempotency',
          link: '/docs/platform/architecture/idempotency',
        },
      ],
    },
    {
      name: 'Products and SDKs',
      pages: [
        {
          name: 'Product guidance',
          link: '/docs/platform/products',
          index: true,
        },
        {
          name: 'SDKs',
          link: '/docs/sdks',
          external: true,
        },
        {
          name: 'Deprecation',
          pages: [
            {
              name: 'Policy',
              link: '/docs/platform/deprecate',
              index: true,
            },
            {
              name: 'Nov 2025 - Protocol v1',
              link: '/docs/platform/deprecate/protocol-v1',
            },
            {
              name: 'June 2025 - TLS v1.0 and v1.1',
              link: '/docs/platform/deprecate/tls-v1-1',
            },
          ],
        },
      ],
    },
    {
      name: 'Pricing',
      pages: [
        {
          link: '/docs/platform/pricing',
          name: 'Overview',
          index: true,
        },
        {
          name: 'Package types',
          pages: [
            {
              link: '/docs/platform/pricing/free',
              name: 'Free',
            },
            {
              link: '/docs/platform/pricing/standard',
              name: 'Standard',
            },
            {
              link: '/docs/platform/pricing/pro',
              name: 'Pro',
            },
            {
              link: '/docs/platform/pricing/enterprise',
              name: 'Enterprise',
            },
          ],
        },
        {
          link: '/docs/platform/pricing/billing',
          name: 'Billing',
        },
        {
          link: '/docs/platform/pricing/limits',
          name: 'Limits',
        },
        {
          name: 'Pricing examples',
          pages: [
            {
              link: '/docs/platform/pricing/examples/ai-chatbot',
              name: 'AI support chatbot',
            },
            {
              link: '/docs/platform/pricing/examples/livestream',
              name: 'Livestream chat',
            },
            {
              link: '/docs/platform/pricing/examples/support-chat',
              name: 'Support chat',
            },
            {
              link: '/docs/platform/pricing/examples/data-broadcast',
              name: 'Data broadcast',
            },
            {
              link: '/docs/platform/pricing/examples/realtime-dashboard',
              name: 'Realtime dashboard',
            },
          ],
        },
        {
          link: '/docs/platform/pricing/faqs',
          name: 'Pricing FAQs',
        },
      ],
    },
    {
      name: 'Integrations',
      pages: [
        {
          name: 'Overview',
          link: '/docs/platform/integrations',
          index: true,
        },
        {
          name: 'Inbound integrations',
          pages: [
            {
              name: 'Inbound webhooks',
              link: '/docs/platform/integrations/inbound/webhooks',
            },
            {
              name: 'Kafka Connector',
              link: '/docs/platform/integrations/inbound/kafka-connector',
            },
          ],
        },
        {
          name: 'Outbound webhooks',
          pages: [
            {
              name: 'Overview',
              link: '/docs/platform/integrations/webhooks',
              index: true,
            },
            {
              name: 'Generic HTTP webhooks',
              link: '/docs/platform/integrations/webhooks/generic',
            },
            {
              name: 'Lambda Functions',
              link: '/docs/platform/integrations/webhooks/lambda',
            },
            {
              name: 'Azure Functions',
              link: '/docs/platform/integrations/webhooks/azure',
            },
            {
              name: 'Google Functions',
              link: '/docs/platform/integrations/webhooks/gcp-function',
            },
            {
              name: 'Zapier',
              link: '/docs/platform/integrations/webhooks/zapier',
            },
            {
              name: 'Cloudflare Workers',
              link: '/docs/platform/integrations/webhooks/cloudflare',
            },
            {
              name: 'IFTTT',
              link: '/docs/platform/integrations/webhooks/ifttt',
            },
          ],
        },
        {
          name: 'Outbound streaming',
          pages: [
            {
              name: 'Overview',
              link: '/docs/platform/integrations/streaming',
              index: true,
            },
            {
              name: 'Kafka',
              link: '/docs/platform/integrations/streaming/kafka',
            },
            {
              name: 'Kinesis',
              link: '/docs/platform/integrations/streaming/kinesis',
            },
            {
              name: 'AMQP',
              link: '/docs/platform/integrations/streaming/amqp',
            },
            {
              name: 'SQS',
              link: '/docs/platform/integrations/streaming/sqs',
            },
            {
              name: 'Pulsar',
              link: '/docs/platform/integrations/streaming/pulsar',
            },
            {
              name: 'DataDog',
              link: '/docs/platform/integrations/streaming/datadog',
            },
          ],
        },
        {
          name: 'Message Queues',
          link: '/docs/platform/integrations/queues',
        },
        {
          name: 'Skip integrations',
          link: '/docs/platform/integrations/skip-integrations',
        },
      ],
    },
    {
      name: 'Account management',
      pages: [
        {
          name: 'Overview',
          link: '/docs/platform/account',
          index: true,
        },
        {
          name: 'User management',
          link: '/docs/platform/account/users',
        },
        {
          name: 'Organizations',
          link: '/docs/platform/account/organizations',
        },
        {
          name: 'Single sign-on (SSO)',
          link: '/docs/platform/account/sso',
        },
        {
          name: 'Two-factor authentication (2FA)',
          link: '/docs/platform/account/2fa',
        },
        {
          name: 'Enterprise customization',
          link: '/docs/platform/account/enterprise-customization',
        },
        {
          name: 'App management',
          pages: [
            {
              name: 'Overview',
              link: '/docs/platform/account/app',
              index: true,
            },
            {
              name: 'Stats',
              link: '/docs/platform/account/app/stats',
            },
            {
              name: 'API keys',
              link: '/docs/platform/account/app/api',
            },
            {
              name: 'Queues',
              link: '/docs/platform/account/app/queues',
            },
            {
              name: 'Notifications',
              link: '/docs/platform/account/app/notifications',
            },
            {
              name: 'Dev console',
              link: '/docs/platform/account/app/console',
            },
            {
              name: 'Settings',
              link: '/docs/platform/account/app/settings',
            },
          ],
        },
        {
          name: 'Access tokens',
          link: '/docs/platform/account/access-tokens',
        },
        {
          name: 'Programmatic management using Control API',
          link: '/docs/platform/account/control-api',
        },
      ],
    },
    {
      name: 'Tools',
      pages: [
        {
          name: 'Ably CLI',
          link: '/docs/platform/tools/cli',
        },
      ],
    },
    {
      name: 'AI and LLMs',
      pages: [
        {
          name: 'Building with LLMs',
          link: '/docs/platform/ai-llms',
          index: true,
        },
        {
          name: 'llms.txt',
          link: '/docs/platform/ai-llms/llms-txt',
        },
      ],
    },
    {
      name: 'Support and debugging',
      pages: [
        {
          name: 'Support tickets',
          link: '/docs/platform/support',
          index: true,
        },
        {
          name: 'Debugging',
          link: '/docs/platform/errors',
          index: true,
        },
        {
          name: 'Error codes',
          link: '/docs/platform/errors/codes',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API references',
      pages: [
        {
          link: '/docs/api/control-api',
          name: 'Control API',
        },
        {
          name: 'Ably CLI Reference',
          pages: [
            {
              name: 'Overview',
              link: '/docs/cli',
              index: true,
            },
            { name: 'Login', link: '/docs/cli/login' },
            {
              name: 'Accounts',
              pages: [
                { name: 'overview', link: '/docs/cli/accounts', index: true },
                { name: 'current', link: '/docs/cli/accounts/current' },
                { name: 'list', link: '/docs/cli/accounts/list' },
                { name: 'login', link: '/docs/cli/accounts/login' },
                { name: 'logout', link: '/docs/cli/accounts/logout' },
                { name: 'switch', link: '/docs/cli/accounts/switch' },
              ],
            },
            {
              name: 'Apps',
              pages: [
                { name: 'overview', link: '/docs/cli/apps', index: true },
                { name: 'create', link: '/docs/cli/apps/create' },
                { name: 'current', link: '/docs/cli/apps/current' },
                { name: 'delete', link: '/docs/cli/apps/delete' },
                { name: 'list', link: '/docs/cli/apps/list' },
                {
                  name: 'rules',
                  pages: [
                    { name: 'overview', link: '/docs/cli/apps/rules', index: true },
                    { name: 'create', link: '/docs/cli/apps/rules/create' },
                    { name: 'delete', link: '/docs/cli/apps/rules/delete' },
                    { name: 'list', link: '/docs/cli/apps/rules/list' },
                    { name: 'update', link: '/docs/cli/apps/rules/update' },
                  ],
                },
                { name: 'switch', link: '/docs/cli/apps/switch' },
                { name: 'update', link: '/docs/cli/apps/update' },
              ],
            },
            {
              name: 'Auth',
              pages: [
                { name: 'overview', link: '/docs/cli/auth', index: true },
                { name: 'issue-ably-token', link: '/docs/cli/auth/issue-ably-token' },
                { name: 'issue-jwt-token', link: '/docs/cli/auth/issue-jwt-token' },
                {
                  name: 'keys',
                  pages: [
                    { name: 'overview', link: '/docs/cli/auth/keys', index: true },
                    { name: 'create', link: '/docs/cli/auth/keys/create' },
                    { name: 'current', link: '/docs/cli/auth/keys/current' },
                    { name: 'get', link: '/docs/cli/auth/keys/get' },
                    { name: 'list', link: '/docs/cli/auth/keys/list' },
                    { name: 'revoke', link: '/docs/cli/auth/keys/revoke' },
                    { name: 'switch', link: '/docs/cli/auth/keys/switch' },
                    { name: 'update', link: '/docs/cli/auth/keys/update' },
                  ],
                },
                { name: 'revoke-token', link: '/docs/cli/auth/revoke-token' },
              ],
            },
            {
              name: 'Bench',
              pages: [
                { name: 'overview', link: '/docs/cli/bench', index: true },
                { name: 'publisher', link: '/docs/cli/bench/publisher' },
                { name: 'subscriber', link: '/docs/cli/bench/subscriber' },
              ],
            },
            {
              name: 'Channels',
              pages: [
                { name: 'overview', link: '/docs/cli/channels', index: true },
                {
                  name: 'annotations',
                  pages: [
                    { name: 'overview', link: '/docs/cli/channels/annotations', index: true },
                    { name: 'delete', link: '/docs/cli/channels/annotations/delete' },
                    { name: 'get', link: '/docs/cli/channels/annotations/get' },
                    { name: 'publish', link: '/docs/cli/channels/annotations/publish' },
                    { name: 'subscribe', link: '/docs/cli/channels/annotations/subscribe' },
                  ],
                },
                { name: 'append', link: '/docs/cli/channels/append' },
                { name: 'batch-publish', link: '/docs/cli/channels/batch-publish' },
                { name: 'delete', link: '/docs/cli/channels/delete' },
                { name: 'history', link: '/docs/cli/channels/history' },
                { name: 'inspect', link: '/docs/cli/channels/inspect' },
                { name: 'list', link: '/docs/cli/channels/list' },
                {
                  name: 'occupancy',
                  pages: [
                    { name: 'overview', link: '/docs/cli/channels/occupancy', index: true },
                    { name: 'get', link: '/docs/cli/channels/occupancy/get' },
                    { name: 'subscribe', link: '/docs/cli/channels/occupancy/subscribe' },
                  ],
                },
                {
                  name: 'presence',
                  pages: [
                    { name: 'overview', link: '/docs/cli/channels/presence', index: true },
                    { name: 'enter', link: '/docs/cli/channels/presence/enter' },
                    { name: 'get', link: '/docs/cli/channels/presence/get' },
                    { name: 'subscribe', link: '/docs/cli/channels/presence/subscribe' },
                  ],
                },
                { name: 'publish', link: '/docs/cli/channels/publish' },
                { name: 'subscribe', link: '/docs/cli/channels/subscribe' },
                { name: 'update', link: '/docs/cli/channels/update' },
              ],
            },
            {
              name: 'Config',
              pages: [
                { name: 'overview', link: '/docs/cli/config', index: true },
                { name: 'path', link: '/docs/cli/config/path' },
                { name: 'show', link: '/docs/cli/config/show' },
              ],
            },
            {
              name: 'Connections',
              pages: [
                { name: 'overview', link: '/docs/cli/connections', index: true },
                { name: 'test', link: '/docs/cli/connections/test' },
              ],
            },
            {
              name: 'Integrations',
              pages: [
                { name: 'overview', link: '/docs/cli/integrations', index: true },
                { name: 'create', link: '/docs/cli/integrations/create' },
                { name: 'delete', link: '/docs/cli/integrations/delete' },
                { name: 'get', link: '/docs/cli/integrations/get' },
                { name: 'list', link: '/docs/cli/integrations/list' },
                { name: 'update', link: '/docs/cli/integrations/update' },
              ],
            },
            {
              name: 'Logs',
              pages: [
                { name: 'overview', link: '/docs/cli/logs', index: true },
                {
                  name: 'channel-lifecycle',
                  pages: [
                    { name: 'overview', link: '/docs/cli/logs/channel-lifecycle', index: true },
                    { name: 'subscribe', link: '/docs/cli/logs/channel-lifecycle/subscribe' },
                  ],
                },
                {
                  name: 'connection-lifecycle',
                  pages: [
                    { name: 'overview', link: '/docs/cli/logs/connection-lifecycle', index: true },
                    { name: 'history', link: '/docs/cli/logs/connection-lifecycle/history' },
                    { name: 'subscribe', link: '/docs/cli/logs/connection-lifecycle/subscribe' },
                  ],
                },
                { name: 'history', link: '/docs/cli/logs/history' },
                {
                  name: 'push',
                  pages: [
                    { name: 'overview', link: '/docs/cli/logs/push', index: true },
                    { name: 'history', link: '/docs/cli/logs/push/history' },
                    { name: 'subscribe', link: '/docs/cli/logs/push/subscribe' },
                  ],
                },
                { name: 'subscribe', link: '/docs/cli/logs/subscribe' },
              ],
            },
            {
              name: 'Push',
              pages: [
                { name: 'overview', link: '/docs/cli/push', index: true },
                { name: 'batch-publish', link: '/docs/cli/push/batch-publish' },
                {
                  name: 'channels',
                  pages: [
                    { name: 'overview', link: '/docs/cli/push/channels', index: true },
                    { name: 'list', link: '/docs/cli/push/channels/list' },
                    { name: 'list-channels', link: '/docs/cli/push/channels/list-channels' },
                    { name: 'remove', link: '/docs/cli/push/channels/remove' },
                    { name: 'remove-where', link: '/docs/cli/push/channels/remove-where' },
                    { name: 'save', link: '/docs/cli/push/channels/save' },
                  ],
                },
                {
                  name: 'config',
                  pages: [
                    { name: 'overview', link: '/docs/cli/push/config', index: true },
                    { name: 'clear-apns', link: '/docs/cli/push/config/clear-apns' },
                    { name: 'clear-fcm', link: '/docs/cli/push/config/clear-fcm' },
                    { name: 'set-apns', link: '/docs/cli/push/config/set-apns' },
                    { name: 'set-fcm', link: '/docs/cli/push/config/set-fcm' },
                    { name: 'show', link: '/docs/cli/push/config/show' },
                  ],
                },
                {
                  name: 'devices',
                  pages: [
                    { name: 'overview', link: '/docs/cli/push/devices', index: true },
                    { name: 'get', link: '/docs/cli/push/devices/get' },
                    { name: 'list', link: '/docs/cli/push/devices/list' },
                    { name: 'remove', link: '/docs/cli/push/devices/remove' },
                    { name: 'remove-where', link: '/docs/cli/push/devices/remove-where' },
                    { name: 'save', link: '/docs/cli/push/devices/save' },
                  ],
                },
                { name: 'publish', link: '/docs/cli/push/publish' },
              ],
            },
            {
              name: 'Queues',
              pages: [
                { name: 'overview', link: '/docs/cli/queues', index: true },
                { name: 'create', link: '/docs/cli/queues/create' },
                { name: 'delete', link: '/docs/cli/queues/delete' },
                { name: 'list', link: '/docs/cli/queues/list' },
              ],
            },
            {
              name: 'Rooms',
              pages: [
                { name: 'overview', link: '/docs/cli/rooms', index: true },
                { name: 'list', link: '/docs/cli/rooms/list' },
                {
                  name: 'messages',
                  pages: [
                    { name: 'overview', link: '/docs/cli/rooms/messages', index: true },
                    { name: 'delete', link: '/docs/cli/rooms/messages/delete' },
                    { name: 'history', link: '/docs/cli/rooms/messages/history' },
                    {
                      name: 'reactions',
                      pages: [
                        { name: 'overview', link: '/docs/cli/rooms/messages/reactions', index: true },
                        { name: 'remove', link: '/docs/cli/rooms/messages/reactions/remove' },
                        { name: 'send', link: '/docs/cli/rooms/messages/reactions/send' },
                        { name: 'subscribe', link: '/docs/cli/rooms/messages/reactions/subscribe' },
                      ],
                    },
                    { name: 'send', link: '/docs/cli/rooms/messages/send' },
                    { name: 'subscribe', link: '/docs/cli/rooms/messages/subscribe' },
                    { name: 'update', link: '/docs/cli/rooms/messages/update' },
                  ],
                },
                {
                  name: 'occupancy',
                  pages: [
                    { name: 'overview', link: '/docs/cli/rooms/occupancy', index: true },
                    { name: 'get', link: '/docs/cli/rooms/occupancy/get' },
                    { name: 'subscribe', link: '/docs/cli/rooms/occupancy/subscribe' },
                  ],
                },
                {
                  name: 'presence',
                  pages: [
                    { name: 'overview', link: '/docs/cli/rooms/presence', index: true },
                    { name: 'enter', link: '/docs/cli/rooms/presence/enter' },
                    { name: 'get', link: '/docs/cli/rooms/presence/get' },
                    { name: 'subscribe', link: '/docs/cli/rooms/presence/subscribe' },
                  ],
                },
                {
                  name: 'reactions',
                  pages: [
                    { name: 'overview', link: '/docs/cli/rooms/reactions', index: true },
                    { name: 'send', link: '/docs/cli/rooms/reactions/send' },
                    { name: 'subscribe', link: '/docs/cli/rooms/reactions/subscribe' },
                  ],
                },
                {
                  name: 'typing',
                  pages: [
                    { name: 'overview', link: '/docs/cli/rooms/typing', index: true },
                    { name: 'keystroke', link: '/docs/cli/rooms/typing/keystroke' },
                    { name: 'subscribe', link: '/docs/cli/rooms/typing/subscribe' },
                  ],
                },
              ],
            },
            {
              name: 'Spaces',
              pages: [
                { name: 'overview', link: '/docs/cli/spaces', index: true },
                { name: 'create', link: '/docs/cli/spaces/create' },
                {
                  name: 'cursors',
                  pages: [
                    { name: 'overview', link: '/docs/cli/spaces/cursors', index: true },
                    { name: 'get', link: '/docs/cli/spaces/cursors/get' },
                    { name: 'set', link: '/docs/cli/spaces/cursors/set' },
                    { name: 'subscribe', link: '/docs/cli/spaces/cursors/subscribe' },
                  ],
                },
                { name: 'get', link: '/docs/cli/spaces/get' },
                { name: 'list', link: '/docs/cli/spaces/list' },
                {
                  name: 'locations',
                  pages: [
                    { name: 'overview', link: '/docs/cli/spaces/locations', index: true },
                    { name: 'get', link: '/docs/cli/spaces/locations/get' },
                    { name: 'set', link: '/docs/cli/spaces/locations/set' },
                    { name: 'subscribe', link: '/docs/cli/spaces/locations/subscribe' },
                  ],
                },
                {
                  name: 'locks',
                  pages: [
                    { name: 'overview', link: '/docs/cli/spaces/locks', index: true },
                    { name: 'acquire', link: '/docs/cli/spaces/locks/acquire' },
                    { name: 'get', link: '/docs/cli/spaces/locks/get' },
                    { name: 'subscribe', link: '/docs/cli/spaces/locks/subscribe' },
                  ],
                },
                {
                  name: 'members',
                  pages: [
                    { name: 'overview', link: '/docs/cli/spaces/members', index: true },
                    { name: 'enter', link: '/docs/cli/spaces/members/enter' },
                    { name: 'get', link: '/docs/cli/spaces/members/get' },
                    { name: 'subscribe', link: '/docs/cli/spaces/members/subscribe' },
                  ],
                },
                {
                  name: 'occupancy',
                  pages: [
                    { name: 'overview', link: '/docs/cli/spaces/occupancy', index: true },
                    { name: 'get', link: '/docs/cli/spaces/occupancy/get' },
                    { name: 'subscribe', link: '/docs/cli/spaces/occupancy/subscribe' },
                  ],
                },
                { name: 'subscribe', link: '/docs/cli/spaces/subscribe' },
              ],
            },
            {
              name: 'Stats',
              pages: [
                { name: 'overview', link: '/docs/cli/stats', index: true },
                { name: 'account', link: '/docs/cli/stats/account' },
                { name: 'app', link: '/docs/cli/stats/app' },
              ],
            },
            {
              name: 'Support',
              pages: [
                { name: 'overview', link: '/docs/cli/support', index: true },
                { name: 'ask', link: '/docs/cli/support/ask' },
                { name: 'contact', link: '/docs/cli/support/contact' },
              ],
            },
            { name: 'Autocomplete', link: '/docs/cli/autocomplete' },
            { name: 'Status', link: '/docs/cli/status' },
            { name: 'Version', link: '/docs/cli/version' },
            { name: 'Help', link: '/docs/cli/help' },
          ],
        },
      ],
    },
  ],
} satisfies NavProduct;
