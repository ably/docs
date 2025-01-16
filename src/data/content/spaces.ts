import { ContentData } from './types';

export default {
  name: 'Spaces',
  meta: {
    title: 'Ably Spaces | Ably Realtime',
    description: 'Spaces enables you to build collaborative environments in your application.',
    image: 'https://files.ably.io/website/images/meta-tags/ably-generic%402x.jpg',
    twitter: '@ablyrealtime',
  },
  sections: [
    {
      title: 'Spaces',
      description:
        'Spaces enables you to build collaborative environments in your application.\n\nIt provides high-level APIs for managing the data related to members collaborating synchronously in an application, such as their online status, or the position of their cursors. This is also known as participant state. Each API is optimized based on the payload structure and frequency of updates that are anticipated for that feature.',
      level: 'h1',
      features: [],
      releaseStage: '',
      callToAction: { text: 'Read more about Spaces', href: '/docs/spaces', type: 'link' },
    },
    {
      title: 'Features',
      cards: [
        {
          title: 'Avatar stack',
          type: 'feature',
          content: 'Display whether members are online, or have recently disconnected.',
          image: 'avatar-stack.svg',
          links: [{ text: 'Read docs', href: '/docs/spaces/avatar' }],
        },
        {
          title: 'Live cursors',
          type: 'feature',
          content: "Show each member's cursor position as they move across a page in realtime.",
          image: 'live-cursors.svg',
          links: [{ text: 'Read docs', href: '/docs/spaces/cursors' }],
        },
        {
          title: 'Member location',
          type: 'feature',
          content: 'Track where members are by highlighting the UI components they have selected.',
          image: 'member-location.svg',
          links: [{ text: 'Read docs', href: '/docs/spaces/locations' }],
        },
        {
          title: 'Component locking',
          type: 'feature',
          content: 'Lock stateful UI components so that only a single member can edit them at once.',
          image: 'component-locking.svg',
          links: [{ text: 'Read docs', href: '/docs/spaces/locking' }],
        },
      ],
    },
  ],
} satisfies ContentData;
