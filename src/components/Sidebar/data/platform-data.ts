import { NavProduct } from '../types';

export default {
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
              external: true,
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
} satisfies NavProduct;
