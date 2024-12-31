import { NavProduct } from './types';

export default {
  name: 'Platform',
  link: '/platform',
  icon: {
    closed: 'icon-product-platform-mono',
    open: 'icon-product-platform',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Ably',
          link: '/platform',
        },
      ],
    },
    {
      name: 'Pricing',
      pages: [
        {
          link: '/pricing',
          name: 'Overview',
        },
        {
          name: 'Package types',
          pages: [
            {
              link: '/pricing/free',
              name: 'Free',
            },
            {
              link: '/pricing/standard',
              name: 'Standard',
            },
            {
              link: '/pricing/pro',
              name: 'Pro',
            },
            {
              link: '/pricing/enterprise',
              name: 'Enterprise',
            },
          ],
        },
        {
          link: '/pricing/billing',
          name: 'Billing',
        },
        {
          link: '/pricing/limits',
          name: 'Limits',
        },
        {
          link: '/pricing/faqs',
          name: 'Pricing FAQs',
        },
      ],
    },
    {
      name: 'Integrations',
      pages: [
        {
          name: 'Overview',
          link: '/integrations',
        },
        {
          name: 'Inbound integrations',
          pages: [
            {
              name: 'Inbound Webhooks',
              link: '/integrations/inbound/webhooks',
            },
            {
              name: 'Kafka Connector',
              link: '/integrations/inbound/kafka-connector',
            },
          ],
        },
        {
          name: 'Outbound Webhooks',
          pages: [
            {
              name: 'Overview',
              link: '/integrations/webhooks',
            },
            {
              name: 'AWS Lambda Functions',
              link: '/integrations/webhooks/lambda',
            },
            {
              name: 'Azure Functions',
              link: '/integrations/webhooks/azure',
            },
            {
              name: 'Google Cloud Functions',
              link: '/integrations/webhooks/gcp-function',
            },
            {
              name: 'Zapier',
              link: '/integrations/webhooks/zapier',
            },
            {
              name: 'Cloudflare Workers',
              link: '/integrations/webhooks/cloudflare',
            },
            {
              name: 'IFTTT',
              link: '/integrations/webhooks/ifttt',
            },
          ],
        },
        {
          name: 'Outbound streaming',
          pages: [
            {
              name: 'Overview',
              link: '/integrations/streaming',
            },
            {
              name: 'Kafka',
              link: '/integrations/streaming/kafka',
            },
            {
              name: 'Kinesis',
              link: '/integrations/streaming/kinesis',
            },
            {
              name: 'AMQP',
              link: '/integrations/streaming/amqp',
            },
            {
              name: 'SQS',
              link: '/integrations/streaming/sqs',
            },
            {
              name: 'Pulsar',
              link: '/integrations/streaming/pulsar',
            },
          ],
        },
        {
          name: 'AWS authentication',
          link: '/integrations/aws-authentication',
        },
        {
          name: 'Message Queues',
          link: '/integrations/queues',
        },
      ],
    },
    {
      name: 'Account management',
      pages: [
        {
          name: 'Overview',
          link: '/account',
        },
        {
          name: 'User management',
          link: '/account/users',
        },
        {
          name: 'Organizations',
          link: '/account/organizations',
        },
        {
          name: 'Single sign-on (SSO)',
          link: '/account/sso',
        },
        {
          name: 'Two-factor authentication (2FA)',
          link: '/account/2fa',
        },
        {
          name: 'Enterprise customization',
          link: '/platform-customization',
        },
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
          name: 'Programmatic management using Control API',
          link: '/account/control-api',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: '/api/control-api',
          name: 'Control API',
        },
      ],
    },
  ],
} satisfies NavProduct;
