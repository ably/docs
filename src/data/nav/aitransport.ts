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
      name: 'Overview',
      link: '/docs/ai-transport',
      index: true,
    },
    {
      name: 'Why AI Transport',
      link: '/docs/ai-transport/why',
    },
    {
      name: 'How it works',
      pages: [
        {
          name: 'Sessions and turns',
          link: '/docs/ai-transport/how-it-works/sessions-and-turns',
        },
        {
          name: 'Transport',
          link: '/docs/ai-transport/how-it-works/transport',
        },
        {
          name: 'Authentication',
          link: '/docs/ai-transport/how-it-works/authentication',
        },
      ],
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'Vercel AI SDK',
          link: '/docs/ai-transport/getting-started/vercel-ai-sdk',
        },
      ],
    },
    {
      name: 'Framework guides',
      pages: [
        {
          name: 'Vercel AI SDK',
          link: '/docs/ai-transport/framework-guides/vercel-ai-sdk',
        },
      ],
    },
    {
      name: 'Features',
      pages: [
        {
          name: 'Token streaming',
          link: '/docs/ai-transport/features/token-streaming',
        },
        {
          name: 'Cancellation',
          link: '/docs/ai-transport/features/cancellation',
        },
        {
          name: 'Reconnection and recovery',
          link: '/docs/ai-transport/features/reconnection-and-recovery',
        },
        {
          name: 'Multi-device sessions',
          link: '/docs/ai-transport/features/multi-device',
        },
        {
          name: 'History and replay',
          link: '/docs/ai-transport/features/history',
        },
        {
          name: 'Conversation branching',
          link: '/docs/ai-transport/features/branching',
        },
        {
          name: 'Interruption and barge-in',
          link: '/docs/ai-transport/features/interruption',
        },
        {
          name: 'Concurrent turns',
          link: '/docs/ai-transport/features/concurrent-turns',
        },
        {
          name: 'Edit and regenerate',
          link: '/docs/ai-transport/features/edit-and-regenerate',
        },
        {
          name: 'Tool calling',
          link: '/docs/ai-transport/features/tool-calling',
        },
        {
          name: 'Human-in-the-loop',
          link: '/docs/ai-transport/features/human-in-the-loop',
        },
        {
          name: 'Optimistic updates',
          link: '/docs/ai-transport/features/optimistic-updates',
        },
        {
          name: 'Agent presence',
          link: '/docs/ai-transport/features/agent-presence',
        },
        {
          name: 'Push notifications',
          link: '/docs/ai-transport/features/push-notifications',
        },
        {
          name: 'Chain of thought',
          link: '/docs/ai-transport/features/chain-of-thought',
        },
        {
          name: 'Double texting',
          link: '/docs/ai-transport/features/double-texting',
        },
      ],
    },
    {
      name: 'API reference',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/api-reference',
          index: true,
        },
        {
          name: 'Client transport',
          link: '/docs/ai-transport/api-reference/client-transport',
        },
        {
          name: 'Server transport',
          link: '/docs/ai-transport/api-reference/server-transport',
        },
        {
          name: 'React hooks',
          link: '/docs/ai-transport/api-reference/react-hooks',
        },
        {
          name: 'Vercel integration',
          link: '/docs/ai-transport/api-reference/vercel',
        },
        {
          name: 'Codec',
          link: '/docs/ai-transport/api-reference/codec',
        },
        {
          name: 'Error codes',
          link: '/docs/ai-transport/api-reference/error-codes',
        },
      ],
    },
    {
      name: 'Internals',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/internals',
          index: true,
        },
        {
          name: 'Wire protocol',
          link: '/docs/ai-transport/internals/wire-protocol',
        },
        {
          name: 'Codec architecture',
          link: '/docs/ai-transport/internals/codec-architecture',
        },
        {
          name: 'Conversation tree',
          link: '/docs/ai-transport/internals/conversation-tree',
        },
        {
          name: 'Transport patterns',
          link: '/docs/ai-transport/internals/transport-patterns',
        },
      ],
    },
    {
      name: 'AI Transport pricing',
      link: '/docs/ai-transport/pricing',
    },
  ],
  api: [],
} satisfies NavProduct;
