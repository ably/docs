import { Guide, GuideProduct, AIProvider } from './types';

export const guides: Guide[] = [
  // Chat
  {
    id: 'build-livestream-chat',
    name: 'Livestream chat',
    description: 'Architecting livestream chat with Ably: performance, reliability, and cost at scale.',
    link: '/docs/guides/chat/build-livestream',
    products: ['chat'],
  },
  {
    id: 'chat-handling-discontinuity',
    name: 'Handle discontinuity in Chat',
    description:
      'Detect and recover from message discontinuity in Ably Chat applications using the onDiscontinuity handler.',
    link: '/docs/guides/chat/handling-discontinuity',
    products: ['chat'],
  },
  // Pub/Sub
  {
    id: 'dashboards-and-visualizations',
    name: 'Building realtime dashboards',
    description:
      'Architecting realtime dashboards with Ably: from fan engagement at scale to critical monitoring.',
    link: '/docs/guides/pub-sub/dashboards-and-visualizations',
    products: ['pubsub'],
  },
  {
    id: 'data-streaming',
    name: 'Data streaming and distribution',
    description:
      'Optimize data streaming at scale with Ably: reduce bandwidth with Deltas, manage bursts with server-side batching.',
    link: '/docs/guides/pub-sub/data-streaming',
    products: ['pubsub'],
  },
  {
    id: 'pubsub-handling-discontinuity',
    name: 'Handle discontinuity in Pub/Sub',
    description:
      'Detect and recover from message discontinuity in Ably Pub/Sub applications using the resumed flag and history API.',
    link: '/docs/guides/pub-sub/handling-discontinuity',
    products: ['pubsub'],
  },
  // AI Transport - Anthropic
  {
    id: 'anthropic-message-per-token',
    name: 'Stream Anthropic responses (message-per-token)',
    description: 'Stream tokens from the Anthropic Messages API over Ably in realtime.',
    link: '/docs/guides/ai-transport/anthropic/anthropic-message-per-token',
    products: ['ai-transport'],
    aiProvider: 'anthropic',
  },
  {
    id: 'anthropic-message-per-response',
    name: 'Stream Anthropic responses (message-per-response)',
    description: 'Stream tokens from the Anthropic Messages API over Ably in realtime using message appends.',
    link: '/docs/guides/ai-transport/anthropic/anthropic-message-per-response',
    products: ['ai-transport'],
    aiProvider: 'anthropic',
  },
  {
    id: 'anthropic-citations',
    name: 'Attach citations to Anthropic responses',
    description: 'Attach source citations to AI responses from the Anthropic Messages API using Ably message annotations.',
    link: '/docs/guides/ai-transport/anthropic/anthropic-citations',
    products: ['ai-transport'],
    aiProvider: 'anthropic',
  },
  {
    id: 'anthropic-human-in-the-loop',
    name: 'Human-in-the-loop approval with Anthropic',
    description: 'Implement human approval workflows for AI agent tool calls using Anthropic and Ably.',
    link: '/docs/guides/ai-transport/anthropic/anthropic-human-in-the-loop',
    products: ['ai-transport'],
    aiProvider: 'anthropic',
  },
  // AI Transport - OpenAI
  {
    id: 'openai-message-per-token',
    name: 'Stream OpenAI responses (message-per-token)',
    description: 'Stream tokens from the OpenAI Responses API over Ably in realtime.',
    link: '/docs/guides/ai-transport/openai/openai-message-per-token',
    products: ['ai-transport'],
    aiProvider: 'openai',
  },
  {
    id: 'openai-message-per-response',
    name: 'Stream OpenAI responses (message-per-response)',
    description: 'Stream tokens from the OpenAI Responses API over Ably in realtime using message appends.',
    link: '/docs/guides/ai-transport/openai/openai-message-per-response',
    products: ['ai-transport'],
    aiProvider: 'openai',
  },
  {
    id: 'openai-citations',
    name: 'Attach citations to OpenAI responses',
    description: 'Attach source citations to AI responses from the OpenAI Responses API using Ably message annotations.',
    link: '/docs/guides/ai-transport/openai/openai-citations',
    products: ['ai-transport'],
    aiProvider: 'openai',
  },
  {
    id: 'openai-human-in-the-loop',
    name: 'Human-in-the-loop approval with OpenAI',
    description: 'Implement human approval workflows for AI agent tool calls using OpenAI and Ably.',
    link: '/docs/guides/ai-transport/openai/openai-human-in-the-loop',
    products: ['ai-transport'],
    aiProvider: 'openai',
  },
  // AI Transport - LangGraph
  {
    id: 'langgraph-message-per-token',
    name: 'Stream LangGraph responses (message-per-token)',
    description: 'Stream tokens from LangGraph over Ably in realtime.',
    link: '/docs/guides/ai-transport/langgraph/lang-graph-message-per-token',
    products: ['ai-transport'],
    aiProvider: 'langchain',
  },
  {
    id: 'langgraph-message-per-response',
    name: 'Stream LangGraph responses (message-per-response)',
    description: 'Stream tokens from LangGraph over Ably in realtime using message appends.',
    link: '/docs/guides/ai-transport/langgraph/lang-graph-message-per-response',
    products: ['ai-transport'],
    aiProvider: 'langchain',
  },
  // AI Transport - Vercel AI SDK
  {
    id: 'vercel-message-per-token',
    name: 'Stream Vercel AI SDK responses (message-per-token)',
    description: 'Stream tokens from the Vercel AI SDK over Ably in realtime.',
    link: '/docs/guides/ai-transport/vercel-ai-sdk/vercel-message-per-token',
    products: ['ai-transport'],
    aiProvider: 'vercel',
  },
  {
    id: 'vercel-message-per-response',
    name: 'Stream Vercel AI SDK responses (message-per-response)',
    description: 'Stream tokens from the Vercel AI SDK over Ably in realtime using message appends.',
    link: '/docs/guides/ai-transport/vercel-ai-sdk/vercel-message-per-response',
    products: ['ai-transport'],
    aiProvider: 'vercel',
  },
];

export const products: Record<
  GuideProduct,
  {
    label: string;
    subFilters?: Record<AIProvider, { label: string }>;
  }
> = {
  pubsub: {
    label: 'Pub/Sub',
  },
  chat: {
    label: 'Chat',
  },
  spaces: {
    label: 'Spaces',
  },
  liveobjects: {
    label: 'LiveObjects',
  },
  'ai-transport': {
    label: 'AI Transport',
    subFilters: {
      anthropic: { label: 'Anthropic' },
      langchain: { label: 'LangChain' },
      openai: { label: 'OpenAI' },
      vercel: { label: 'Vercel AI' },
    },
  },
};

export const aiProviders: Record<AIProvider, { label: string }> = {
  anthropic: { label: 'Anthropic' },
  langchain: { label: 'LangChain' },
  openai: { label: 'OpenAI' },
  vercel: { label: 'Vercel AI' },
};
