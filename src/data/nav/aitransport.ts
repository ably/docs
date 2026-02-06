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
      name: 'About AI Transport',
      link: '/docs/ai-transport',
      index: true,
    },
    {
      name: 'Token streaming',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/token-streaming',
          index: true,
        },
        {
          name: 'Message per response',
          link: '/docs/ai-transport/token-streaming/message-per-response',
        },
        {
          name: 'Message per token',
          link: '/docs/ai-transport/token-streaming/message-per-token',
        },
        {
          name: 'Token streaming limits',
          link: '/docs/ai-transport/token-streaming/token-rate-limits',
        },
      ],
    },
    {
      name: 'Sessions & Identity',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/sessions-identity',
        },
        {
          name: 'Identifying users and agents',
          link: '/docs/ai-transport/sessions-identity/identifying-users-and-agents',
        },
        {
          name: 'Online status',
          link: '/docs/ai-transport/sessions-identity/online-status',
        },
        {
          name: 'Push notifications',
          link: '/docs/ai-transport/sessions-identity/push-notifications',
        },
        {
          name: 'Resuming sessions',
          link: '/docs/ai-transport/sessions-identity/resuming-sessions',
        },
      ],
    },
    {
      name: 'Messaging',
      pages: [
        {
          name: 'Accepting user input',
          link: '/docs/ai-transport/messaging/accepting-user-input',
        },
        {
          name: 'Tool calls',
          link: '/docs/ai-transport/messaging/tool-calls',
        },
        {
          name: 'Human-in-the-loop',
          link: '/docs/ai-transport/messaging/human-in-the-loop',
        },
        {
          name: 'Chain of thought',
          link: '/docs/ai-transport/messaging/chain-of-thought',
        },
        {
          name: 'Citations',
          link: '/docs/ai-transport/messaging/citations',
        },
        {
          name: 'Completion and cancellation',
          link: '/docs/ai-transport/messaging/completion-and-cancellation',
        },
      ],
    },
    {
      name: 'Guides',
      pages: [
        {
          name: 'Anthropic',
          pages: [
            {
              name: 'Message per response',
              link: '/docs/guides/ai-transport/anthropic-message-per-response',
            },
            {
              name: 'Message per token',
              link: '/docs/guides/ai-transport/anthropic-message-per-token',
            },
          ],
        },
        {
          name: 'OpenAI',
          pages: [
            {
              name: 'Message per response',
              link: '/docs/guides/ai-transport/openai-message-per-response',
            },
            {
              name: 'Message per token',
              link: '/docs/guides/ai-transport/openai-message-per-token',
            },
          ],
        },
        {
          name: 'LangGraph',
          pages: [
            {
              name: 'Message per response',
              link: '/docs/guides/ai-transport/lang-graph-message-per-response',
            },
            {
              name: 'Message per token',
              link: '/docs/guides/ai-transport/lang-graph-message-per-token',
            },
          ],
        },
        {
          name: 'Vercel AI SDK',
          pages: [
            {
              name: 'Message per response',
              link: '/docs/guides/ai-transport/vercel-message-per-response',
            },
            {
              name: 'Message per token',
              link: '/docs/guides/ai-transport/vercel-message-per-token',
            },
          ],
        },
      ],
    },
  ],
  api: [],
} satisfies NavProduct;
