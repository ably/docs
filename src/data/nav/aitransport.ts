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
          name: 'Overview',
          link: '/docs/ai-transport/features/token-streaming',
          index: true,
        },
        {
          name: 'Message per response',
          link: '/docs/ai-transport/features/token-streaming/message-per-response',
        },
        {
          name: 'Message per token',
          link: '/docs/ai-transport/features/token-streaming/message-per-token',
        },
      ],
    },
    {
      name: 'Sessions & Identity',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/features/sessions-identity',
        },
        {
          name: 'Identifying users and agents',
          link: '/docs/ai-transport/features/sessions-identity/identifying-users-and-agents',
        },
        {
          name: 'Online status',
          link: '/docs/ai-transport/features/sessions-identity/online-status',
        },
        {
          name: 'Resuming sessions',
          link: '/docs/ai-transport/features/sessions-identity/resuming-sessions',
        },
      ],
    },
    {
      name: 'Messaging',
      pages: [
        {
          name: 'Human-in-the-loop',
          link: '/docs/ai-transport/features/messaging/human-in-the-loop',
        },
        {
          name: 'Chain of thought',
          link: '/docs/ai-transport/features/messaging/chain-of-thought',
        },
      ],
    },
    {
      name: 'Guides',
      pages: [
        {
          name: 'OpenAI token streaming - message per token',
          link: '/docs/guides/ai-transport/openai-message-per-token',
        },
        {
          name: 'OpenAI token streaming - message per response',
          link: '/docs/guides/ai-transport/openai-message-per-response',
        },
      ],
    },
    {
      name: 'Advanced',
      pages: [
        {
          name: 'Citations',
          link: '/docs/ai-transport/features/advanced/citations',
        },
      ],
    },
  ],
  api: [],
} satisfies NavProduct;
