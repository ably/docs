import { NavProduct } from '../types';

export default {
  name: 'Chat',
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
        {
          name: 'SDK setup',
          link: '/chat/setup',
        },
        {
          name: 'Connections',
          link: '/chat/connect',
        },
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
} satisfies NavProduct;
