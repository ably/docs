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
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/why',
          index: true,
        },
        {
          name: 'HTTP streaming and AI',
          link: '/docs/ai-transport/why/http-streaming-and-ai',
        },
      ],
    },
    {
      name: 'Concepts',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/concepts',
          index: true,
        },
        {
          name: 'Sessions',
          link: '/docs/ai-transport/concepts/sessions',
        },
        {
          name: 'Conversation tree',
          link: '/docs/ai-transport/concepts/conversation-tree',
        },
        {
          name: 'Turns',
          link: '/docs/ai-transport/concepts/turns',
        },
        {
          name: 'Transport',
          link: '/docs/ai-transport/concepts/transport',
        },
        {
          name: 'Authentication',
          link: '/docs/ai-transport/concepts/authentication',
        },
        {
          name: 'Infrastructure',
          link: '/docs/ai-transport/concepts/infrastructure',
        },
      ],
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'Core SDK',
          link: '/docs/ai-transport/getting-started/core-sdk',
        },
        {
          name: 'Vercel AI SDK',
          link: '/docs/ai-transport/getting-started/vercel-ai-sdk',
        },
      ],
    },
    {
      name: 'Frameworks',
      pages: [
        {
          name: 'Vercel AI SDK UI',
          link: '/docs/ai-transport/frameworks/vercel-ai-sdk-ui',
        },
        {
          name: 'Vercel AI SDK Core',
          link: '/docs/ai-transport/frameworks/vercel-ai-sdk-core',
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
          name: 'Barge-in',
          link: '/docs/ai-transport/features/barge-in',
        },
        {
          name: 'Concurrent turns',
          link: '/docs/ai-transport/features/concurrent-turns',
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
      name: 'Going to production',
      link: '/docs/ai-transport/going-to-production',
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
  ],
  api: [],
} satisfies NavProduct;
