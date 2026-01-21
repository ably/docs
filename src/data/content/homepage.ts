import { ContentData } from './types';

export default {
  name: 'Homepage',
  meta: {
    title: 'Docs | Ably Realtime',
    description:
      "Documentation explaining Ably's realtime platform, products and SDKs. Learn how to build applications that scale.",
    image: 'https://files.ably.io/website/images/meta-tags/ably-generic%402x.jpg',
    twitter: '@ablyrealtime',
  },
  platformProducts: {
    title: 'Platform and Products',
    platformCard: {
      title: 'Platform',
      content: "Understand the core concepts and features of Ably's platform.",
      image: 'platform.png',
      link: '/docs/platform',
    },
    productCards: [
      {
        name: 'pubsub',
        link: '/docs/basics',
      },
      {
        name: 'chat',
        link: '/docs/chat',
      },
      {
        name: 'spaces',
        link: '/docs/spaces',
      },
      {
        name: 'liveObjects',
        link: '/docs/liveobjects',
      },
      {
        name: 'liveSync',
        link: '/docs/livesync',
      },
      {
        name: 'aiTransport',
        link: '/docs/ai-transport',
      },
    ],
  },
  examples: {
    title: 'Examples',
    link: { text: 'View all', href: '/examples' },
    content:
      'From avatar stacks to live cursors, learn how deliver live chat, multiplayer collaboration features, and more.',
    image: 'examples_image.png',
  },
  tooling: {
    title: 'Tooling',
    cards: [
      {
        title: 'AI and LLMs',
        description:
          'Use AI assistants to build with Ably. Access LLM-friendly markdown docs and prompts for your AI tools.',
        link: '/docs/platform/ai-llms',
      },
      {
        title: 'Ably CLI',
        description:
          'Interact with your Ably apps from the command line. Manage resources, test channels, and debug connections.',
        link: '/docs/platform/tools/cli',
      },
    ],
  },
} satisfies ContentData;
