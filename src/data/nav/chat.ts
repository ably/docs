import { link } from 'fs';
import { NavProduct } from './types';

export default {
  name: 'Ably Chat',
  link: '/docs/chat',
  icon: {
    closed: 'icon-product-chat-mono',
    open: 'icon-product-chat',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Chat',
          link: '/docs/chat',
        },
      ],
    },
    {
      name: 'Get started',
      pages: [
        {
          name: 'SDK setup',
          link: '/docs/chat/setup',
        },
        {
          name: 'Connections',
          link: '/docs/chat/connect',
        },
        {
          name: 'Rooms',
          link: '/docs/chat/rooms',
        },
      ],
    },
    {
      name: 'Room features',
      pages: [
        {
          name: 'Messages',
          link: '/docs/chat/rooms/messages',
        },
        {
          name: 'Message storage and history',
          link: '/docs/chat/rooms/history',
        },
        {
          name: 'Online status',
          link: '/docs/chat/rooms/presence',
        },
        {
          name: 'Occupancy',
          link: '/docs/chat/rooms/occupancy',
        },
        {
          name: 'Typing indicators',
          link: '/docs/chat/rooms/typing',
        },
        {
          name: 'Room reactions',
          link: '/docs/chat/rooms/reactions',
        },
        {
          name: 'Moderation',
          pages: [
            {
              name: 'Introduction',
              link: '/docs/chat/rooms/moderation',
            },
            {
              name: 'Hive (Model Only)',
              link: '/docs/chat/rooms/moderation/hive-model-only',
            },
            {
              name: 'Hive (Dashboard)',
              link: '/docs/chat/rooms/moderation/hive-dashboard',
            },
            {
              name: 'AWS Lambda',
              link: '/docs/chat/rooms/moderation/lambda',
            },
          ],
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: 'https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/modules/chat-js.html',
          name: 'JavaScript SDK',
          external: true,
        },
        {
          link: 'https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/modules/chat-react.html',
          name: 'React SDK',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;
