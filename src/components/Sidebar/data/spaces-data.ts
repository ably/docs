import { NavProduct } from '../types';

export default {
  name: 'Spaces',
  icon: {
    closed: 'icon-product-spaces-mono',
    open: 'icon-product-spaces',
  },
  content: [
    {
      name: 'Spaces',
      pages: [
        {
          name: 'What is Spaces?',
          link: '/spaces',
        },
        {
          name: 'SDK setup',
          link: '/spaces/setup',
        },
        {
          name: 'React Hooks',
          link: '/spaces/react',
        },
        {
          name: 'Space',
          link: '/spaces/space',
        },
        {
          name: 'Avatar stack',
          link: '/spaces/avatar',
        },
        {
          name: 'Member location',
          link: '/spaces/locations',
        },
        {
          name: 'Live cursors',
          link: '/spaces/cursors',
        },
        {
          name: 'Component locking',
          link: '/spaces/locking',
        },
      ],
    },
  ],
} satisfies NavProduct;
