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
