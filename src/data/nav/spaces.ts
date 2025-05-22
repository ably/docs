import { NavProduct } from './types';

export default {
  name: 'Ably Spaces',
  link: '/docs/spaces',
  icon: {
    closed: 'icon-gui-prod-spaces-outline',
    open: 'icon-gui-prod-spaces-solid',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Spaces',
          link: '/docs/spaces',
          index: true,
        },
      ],
    },
    {
      name: 'Get started',
      pages: [
        {
          name: 'SDK setup',
          link: '/docs/spaces/setup',
        },
        {
          name: 'React Hooks',
          link: '/docs/spaces/react',
        },
      ],
    },
    {
      name: 'Space features',
      pages: [
        {
          name: 'Space',
          link: '/docs/spaces/space',
        },
        {
          name: 'Avatar stack',
          link: '/docs/spaces/avatar',
        },
        {
          name: 'Member location',
          link: '/docs/spaces/locations',
        },
        {
          name: 'Live cursors',
          link: '/docs/spaces/cursors',
        },
        {
          name: 'Component locking',
          link: '/docs/spaces/locking',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API References',
      pages: [
        {
          link: 'https://sdk.ably.com/builds/ably/spaces/main/typedoc/index.html',
          name: 'JavaScript',
          external: true,
        },
      ],
    },
  ],
} satisfies NavProduct;
