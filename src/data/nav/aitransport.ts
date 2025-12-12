import { NavProduct } from './types';

export default {
  name: 'Ably AI Transport',
  link: '/docs/ai-transport',
  icon: {
    closed: 'icon-gui-prod-ai-transport-outline',
    open: 'icon-gui-prod-ai-transport-solid',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About AI Transport',
          link: '/docs/ai-transport',
          index: true,
        },
      ],
    },
    {
      name: 'Sessions & Identity',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/sessions-identity/overview',
        },
      ],
    },
  ],
  api: [],
} satisfies NavProduct;
