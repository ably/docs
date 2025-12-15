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
          link: '/docs/account',
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
          name: 'Programmatic management using Control API',
          link: '/docs/platform/account/control-api',
        },
      ],
    },
    {
      name: 'Debugging and errors',
      pages: [
        {
          name: 'Overview',
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
      ],
    },
  ],
} satisfies NavProduct;
