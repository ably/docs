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
      name: 'Getting started',
      pages: [
        {
          name: 'About AI Transport',
          link: '/docs/ai-transport',
          index: true,
        },
        {
          name: 'By SDK',
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
          name: 'Set up authentication',
          link: '/docs/ai-transport/getting-started/authentication',
        },
        {
          name: 'Enable channel rules',
          link: '/docs/ai-transport/getting-started/channel-rules',
        },
      ],
    },
    {
      name: 'Why AI Transport?',
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
          name: 'Connections',
          link: '/docs/ai-transport/concepts/connections',
        },
        {
          name: 'Runs',
          link: '/docs/ai-transport/concepts/runs',
        },
        {
          name: 'Invocations',
          link: '/docs/ai-transport/concepts/invocations',
        },
        {
          name: 'Codecs',
          link: '/docs/ai-transport/concepts/codecs',
        },
        {
          name: 'Conversation tree',
          link: '/docs/ai-transport/concepts/conversation-tree',
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
      name: 'Guides',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/guides',
          index: true,
        },
        {
          name: 'Building support chat',
          link: '/docs/ai-transport/guides/building-support-chat',
        },
        {
          name: 'Building a copilot',
          link: '/docs/ai-transport/guides/building-a-copilot',
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
          name: 'Branching, edit, and regenerate',
          link: '/docs/ai-transport/features/branching',
        },
        {
          name: 'Interruption',
          link: '/docs/ai-transport/features/interruption',
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
      name: 'Production',
      pages: [
        {
          name: 'Going to production',
          link: '/docs/ai-transport/going-to-production',
        },
        {
          name: 'Troubleshooting',
          link: '/docs/ai-transport/troubleshooting',
        },
      ],
    },
    {
      name: 'API reference',
      pages: [
        {
          name: 'Overview',
          link: '/docs/ai-transport/api',
          index: true,
        },
        {
          name: 'JavaScript',
          pages: [
            {
              name: 'Core SDK',
              pages: [
                {
                  name: 'Client session',
                  link: '/docs/ai-transport/api/javascript/core/client-session',
                },
                {
                  name: 'Agent session',
                  link: '/docs/ai-transport/api/javascript/core/agent-session',
                },
                {
                  name: 'Codec',
                  link: '/docs/ai-transport/api/javascript/core/codec',
                },
              ],
            },
            {
              name: 'Vercel',
              pages: [
                {
                  name: 'Chat transport',
                  link: '/docs/ai-transport/api/javascript/vercel/chat-transport',
                },
                {
                  name: 'Codec',
                  link: '/docs/ai-transport/api/javascript/vercel/codec',
                },
                {
                  name: 'Run outcome',
                  link: '/docs/ai-transport/api/javascript/vercel/run-outcome',
                },
              ],
            },
          ],
        },
        {
          name: 'React',
          pages: [
            {
              name: 'Core SDK',
              pages: [
                {
                  name: 'Providers',
                  link: '/docs/ai-transport/api/react/core/providers',
                },
                {
                  name: 'useClientSession',
                  link: '/docs/ai-transport/api/react/core/use-client-session',
                },
                {
                  name: 'useView',
                  link: '/docs/ai-transport/api/react/core/use-view',
                },
                {
                  name: 'useCreateView',
                  link: '/docs/ai-transport/api/react/core/use-create-view',
                },
                {
                  name: 'useTree',
                  link: '/docs/ai-transport/api/react/core/use-tree',
                },
                {
                  name: 'useAblyMessages',
                  link: '/docs/ai-transport/api/react/core/use-ably-messages',
                },
              ],
            },
            {
              name: 'Vercel',
              pages: [
                {
                  name: 'ChatTransportProvider',
                  link: '/docs/ai-transport/api/react/vercel/chat-transport-provider',
                },
                {
                  name: 'useChatTransport',
                  link: '/docs/ai-transport/api/react/vercel/use-chat-transport',
                },
                {
                  name: 'useMessageSync',
                  link: '/docs/ai-transport/api/react/vercel/use-message-sync',
                },
              ],
            },
          ],
        },
        {
          name: 'Errors',
          link: '/docs/ai-transport/api/errors',
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
