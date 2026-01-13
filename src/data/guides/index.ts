import { Guide, GuideProduct, AIProvider } from './types';

export const guides: Guide[] = [
  {
    id: 'build-livestream-chat',
    name: 'Livestream chat',
    description: 'Learn how to architect a Livestream chat application to perform at any scale.',
    link: '/docs/guides/chat/build-livestream',
    products: ['chat'],
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
