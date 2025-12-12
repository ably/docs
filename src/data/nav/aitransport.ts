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
      name: 'Token streaming',
      pages: [
        {
          name: 'Message per response',
          link: '/docs/ai-transport/features/token-streaming/message-per-response',
        },
      ],
    },
  ],
  api: [],
} satisfies NavProduct;
