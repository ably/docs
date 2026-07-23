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
              name: 'OpenAI',
              link: '/docs/ai-transport/getting-started/openai',
            },
            {
              name: 'Vercel AI SDK',
              link: '/docs/ai-transport/getting-started/vercel-ai-sdk',
            },
            {
              name: 'Vercel WDK',
              link: '/docs/ai-transport/getting-started/vercel-wdk',
            },
            {
              name: 'Temporal',
              link: '/docs/ai-transport/getting-started/temporal',
            },
          ],
        },
        {
          name: 'Set up authentication',
          link: '/docs/ai-transport/getting-started/authentication',
        },
        {
          name: 'Configure the channel rule',
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
          name: 'Steps',
          link: '/docs/ai-transport/concepts/steps',
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
          name: 'OpenAI',
          link: '/docs/ai-transport/frameworks/openai',
        },
        {
          name: 'Vercel AI SDK UI',
          link: '/docs/ai-transport/frameworks/vercel-ai-sdk-ui',
        },
        {
          name: 'Vercel AI SDK Core',
          link: '/docs/ai-transport/frameworks/vercel-ai-sdk-core',
        },
        {
          name: 'Vercel WDK',
          link: '/docs/ai-transport/frameworks/vercel-wdk',
        },
        {
          name: 'Temporal',
          link: '/docs/ai-transport/frameworks/temporal',
        },
      ],
    },
    {
      name: 'Features',
      pages: [
        {
          name: 'Agent presence',
          link: '/docs/ai-transport/features/agent-presence',
        },
        {
          name: 'Branching, edit, and regenerate',
          link: '/docs/ai-transport/features/branching',
        },
        {
          name: 'Cancellation',
          link: '/docs/ai-transport/features/cancellation',
        },
        {
          name: 'Chain of thought',
          link: '/docs/ai-transport/features/chain-of-thought',
        },
        {
          name: 'Concurrent turns',
          link: '/docs/ai-transport/features/concurrent-turns',
        },
        {
          name: 'Database hydration',
          link: '/docs/ai-transport/features/database-hydration',
        },
        {
          name: 'Double texting',
          link: '/docs/ai-transport/features/double-texting',
        },
        {
          name: 'Durable execution',
          link: '/docs/ai-transport/features/durable-execution',
        },
        {
          name: 'History and replay',
          link: '/docs/ai-transport/features/history',
        },
        {
          name: 'Human-in-the-loop',
          link: '/docs/ai-transport/features/human-in-the-loop',
        },
        {
          name: 'Interruption and steering',
          link: '/docs/ai-transport/features/interruption-and-steering',
        },
        {
          name: 'LiveObjects State',
          link: '/docs/ai-transport/features/liveobjects',
        },
        {
          name: 'Multi-device sessions',
          link: '/docs/ai-transport/features/multi-device',
        },
        {
          name: 'Optimistic updates',
          link: '/docs/ai-transport/features/optimistic-updates',
        },
        {
          name: 'Push notifications',
          link: '/docs/ai-transport/features/push-notifications',
        },
        {
          name: 'Reconnection and recovery',
          link: '/docs/ai-transport/features/reconnection-and-recovery',
        },
        {
          name: 'Token streaming',
          link: '/docs/ai-transport/features/token-streaming',
        },
        {
          name: 'Tool calling',
          link: '/docs/ai-transport/features/tool-calling',
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
          name: 'Roadmap',
          link: '/docs/ai-transport/roadmap',
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
            {
              name: 'Temporal',
              pages: [
                {
                  name: 'stepIdFor',
                  link: '/docs/ai-transport/api/javascript/temporal',
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
                  name: 'useMessagesWithSeed',
                  link: '/docs/ai-transport/api/react/core/use-messages-with-seed',
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
