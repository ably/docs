import { NavProduct } from './types';

export default {
  name: 'Platform',
  icon: {
    closed: 'icon-product-platform-mono',
    open: 'icon-product-platform',
  },
  content: [
    {
      name: 'About',
      pages: [
        {
          name: 'Platform customization',
          link: '/docs/platform-customization',
        },
        {
          name: 'Glossary',
          link: '/docs/glossary',
        },
      ],
    },
    {
      name: 'Pricing',
      pages: [
        {
          link: '/docs/pricing',
          name: 'Overview',
        },
        {
          name: 'Package types',
          pages: [
            {
              link: '/docs/pricing/free',
              name: 'Free',
            },
            {
              link: '/docs/pricing/standard',
              name: 'Standard',
            },
            {
              link: '/docs/pricing/pro',
              name: 'Pro',
            },
            {
              link: '/docs/pricing/enterprise',
              name: 'Enterprise',
            },
          ],
        },
        {
          link: '/docs/pricing/billing',
          name: 'Billing',
        },
        {
          link: '/docs/pricing/limits',
          name: 'Limits',
        },
        {
          link: '/docs/pricing/faqs',
          name: 'Pricing FAQs',
        },
      ],
    },
    {
      name: 'Integrations',
      pages: [
        {
          name: 'Overview',
          link: '/docs/general/integrations',
        },
        {
          name: 'Events',
          pages: [
            {
              name: 'Overview',
              link: '/docs/general/webhooks',
            },
            {
              name: 'AWS Lambda Functions',
              link: '/docs/general/webhooks/aws-lambda',
            },
            {
              name: 'Azure Functions',
              link: '/docs/general/webhooks/azure',
            },
            {
              name: 'Google Cloud Functions',
              link: '/docs/general/webhooks/google-functions',
            },
            {
              name: 'Zapier',
              link: '/docs/general/webhooks/zapier',
            },
            {
              name: 'Cloudflare Workers',
              link: '/docs/general/webhooks/cloudflare',
            },
            {
              name: 'IFTTT',
              link: '/docs/general/webhooks/ifttt',
            },
          ],
        },
        {
          name: 'Message Queues',
          link: '/docs/general/queues',
        },
        {
          name: 'Kafka Connector',
          link: '/docs/general/kafka-connector',
        },
        {
          name: 'Firehose',
          pages: [
            {
              name: 'Overview',
              link: '/docs/general/firehose',
            },
            {
              name: 'Kafka Rule',
              link: '/docs/general/firehose/kafka-rule',
            },
            {
              name: 'Kinesis Rule',
              link: '/docs/general/firehose/kinesis-rule',
            },
            {
              name: 'AMQP Rule',
              link: '/docs/general/firehose/amqp-rule',
            },
            {
              name: 'SQS Rule',
              link: '/docs/general/firehose/sqs-rule',
            },
            {
              name: 'Pulsar Rule',
              link: '/docs/general/firehose/pulsar-rule',
            },
          ],
        },
      ],
    },
    {
      name: 'Account management',
      pages: [
        {
          name: 'Overview',
          link: '/docs/account',
        },
        {
          name: 'User management',
          link: '/docs/account/users',
        },
        {
          name: 'Organizations',
          link: '/docs/account/organizations',
        },
        {
          name: 'Single sign-on (SSO)',
          link: '/docs/account/sso',
        },
        {
          name: 'Two-factor authentication (2FA)',
          link: '/docs/account/2fa',
        },
        {
          name: 'App management',
          pages: [
            {
              name: 'Overview',
              link: '/docs/account/app',
            },
            {
              name: 'Stats',
              link: '/docs/account/app/stats',
            },
            {
              name: 'API keys',
              link: '/docs/account/app/api',
            },
            {
              name: 'Queues',
              link: '/docs/account/app/queues',
            },
            {
              name: 'Notifications',
              link: '/docs/account/app/notifications',
            },
            {
              name: 'Dev console',
              link: '/docs/account/app/console',
            },
            {
              name: 'Settings',
              link: '/docs/account/app/settings',
            },
          ],
        },
        {
          name: 'Programmatic management using Control API',
          link: '/docs/account/control-api',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: '/docs/api/control-api',
          name: 'Control API',
        },
      ],
    },
  ],
} satisfies NavProduct;
