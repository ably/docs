import { NavProduct } from './types';

export default {
  name: 'Ably Chat',
  link: '/products/chat',
  icon: {
    closed: 'icon-product-chat-mono',
    open: 'icon-product-chat',
  },
  content: [
    {
      name: 'Chat',
      pages: [
        {
          name: 'About Chat',
          link: '/products/chat',
        },
      ],
    },
    {
      name: 'Get started',
      pages: [
        {
          name: 'SDK setup',
          link: '/chat/setup',
        },
        {
          name: 'Connections',
          link: '/chat/connect',
        },
      ],
    },
    {
      name: 'Room features',
      pages: [
        {
          name: 'Rooms',
          link: '/chat/rooms',
        },
        {
          name: 'Messages',
          link: '/chat/rooms/messages',
        },
        {
          name: 'Message storage and history',
          link: '/chat/rooms/history',
        },
        {
          name: 'Online status',
          link: '/chat/rooms/presence',
        },
        {
          name: 'Occupancy',
          link: '/chat/rooms/occupancy',
        },
        {
          name: 'Typing indicators',
          link: '/chat/rooms/typing',
        },
        {
          name: 'Room reactions',
          link: '/chat/rooms/reactions',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: 'https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/modules/chat_js.html',
          name: 'JavaScript SDK',
          external: true,
        },
        {
          link: 'https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/modules/chat_react.html',
          name: 'React SDK',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;