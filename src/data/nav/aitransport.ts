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
      link: '/docs/ai-transport/why-ai-transport',
    },
    {
      name: 'How it works',
      pages: [
        { name: 'Overview', link: '/docs/ai-transport/how-it-works', index: true },
        { name: 'Sessions', link: '/docs/ai-transport/how-it-works/sessions' },
        { name: 'Transport', link: '/docs/ai-transport/how-it-works/transport' },
        { name: 'Turns', link: '/docs/ai-transport/how-it-works/turns' },
      ],
    },
    {
      name: 'Authentication',
      link: '/docs/ai-transport/authentication',
    },
    {
      name: 'Getting started',
      pages: [
        { name: 'Anthropic', link: '/docs/ai-transport/getting-started/anthropic' },
        { name: 'Vercel AI SDK', link: '/docs/ai-transport/getting-started/vercel-ai-sdk' },
        { name: 'Custom integration', link: '/docs/ai-transport/getting-started/custom' },
      ],
    },
    {
      name: 'Framework guides',
      pages: [
        { name: 'Anthropic', link: '/docs/ai-transport/framework-guides/anthropic' },
        { name: 'Vercel AI SDK', link: '/docs/ai-transport/framework-guides/vercel-ai-sdk' },
        { name: 'Custom integration', link: '/docs/ai-transport/framework-guides/custom' },
      ],
    },
    {
      name: 'Features',
      pages: [
        { name: 'Token streaming', link: '/docs/ai-transport/features/token-streaming' },
        { name: 'Reconnection and recovery', link: '/docs/ai-transport/features/reconnection-and-recovery' },
        { name: 'Tool calls', link: '/docs/ai-transport/features/tool-calls' },
        { name: 'Human-in-the-loop', link: '/docs/ai-transport/features/human-in-the-loop' },
        { name: 'Chain of thought', link: '/docs/ai-transport/features/chain-of-thought' },
        { name: 'Citations', link: '/docs/ai-transport/features/citations' },
        { name: 'Cancel', link: '/docs/ai-transport/features/cancel' },
        { name: 'Steer mid-stream', link: '/docs/ai-transport/features/steer-mid-stream' },
        { name: 'History and replay', link: '/docs/ai-transport/features/history-and-replay' },
        { name: 'Agent presence and health', link: '/docs/ai-transport/features/agent-presence-and-health' },
        { name: 'Push notifications', link: '/docs/ai-transport/features/push-notifications' },
        { name: 'Multi-device sessions', link: '/docs/ai-transport/features/multi-device-sessions' },
        { name: 'Multi-user sessions', link: '/docs/ai-transport/features/multi-user-sessions' },
      ],
    },
    {
      name: 'Use cases and demos',
      pages: [
        { name: 'Support chat', link: '/docs/ai-transport/use-cases/support-chat' },
      ],
    },
    {
      name: 'Examples',
      link: '/docs/ai-transport/examples',
    },
    {
      name: 'Going to production',
      pages: [
        { name: 'Pricing and cost control', link: '/docs/ai-transport/going-to-production/pricing-and-cost-control' },
        { name: 'Limits', link: '/docs/ai-transport/going-to-production/limits' },
        { name: 'Compliance', link: '/docs/ai-transport/going-to-production/compliance' },
        { name: 'Production checklist', link: '/docs/ai-transport/going-to-production/production-checklist' },
        { name: 'Monitoring and observability', link: '/docs/ai-transport/going-to-production/monitoring-and-observability' },
      ],
    },
    {
      name: 'API reference',
      pages: [
        { name: 'Client transport API', link: '/docs/ai-transport/api-reference/client-transport-api' },
        { name: 'Server transport API', link: '/docs/ai-transport/api-reference/server-transport-api' },
        { name: 'React hooks', link: '/docs/ai-transport/api-reference/react-hooks' },
        { name: 'Codec API', link: '/docs/ai-transport/api-reference/codec-api' },
        { name: 'Error codes', link: '/docs/ai-transport/api-reference/error-codes' },
      ],
    },
    {
      name: 'Internals',
      pages: [
        { name: 'Overview', link: '/docs/ai-transport/internals', index: true },
        { name: 'Codec architecture', link: '/docs/ai-transport/internals/codec-architecture' },
        { name: 'Wire protocol', link: '/docs/ai-transport/internals/wire-protocol' },
        { name: 'Transport patterns', link: '/docs/ai-transport/internals/transport-patterns' },
        { name: 'Event mapping', link: '/docs/ai-transport/internals/event-mapping' },
      ],
    },
  ],
  api: [],
} satisfies NavProduct;
