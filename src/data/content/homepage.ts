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
        name: 'liveSync',
        link: '/docs/livesync',
      },
      {
        name: 'assetTracking',
        link: '/docs/asset-tracking',
      },
      {
        name: 'liveObjects',
        link: '/docs/liveobjects',
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
} satisfies ContentData;
