import { NavProduct } from './types';

export default {
  name: 'Ably Chat',
  link: '/docs/chat',
  icon: {
    closed: 'icon-gui-prod-chat-outline',
    open: 'icon-gui-prod-chat-solid',
  },
  content: [
    {
      name: 'Introduction',
      pages: [
        {
          name: 'About Chat',
          link: '/docs/chat',
          index: true,
        },
        {
          name: 'Getting started',
          pages: [
            {
              name: 'JavaScript',
              link: '/docs/chat/getting-started/javascript',
            },
            {
              name: 'React',
              link: '/docs/chat/getting-started/react',
            },
            {
              name: 'React Native',
              link: '/docs/chat/getting-started/react-native',
            },
            {
              name: 'Kotlin',
              link: '/docs/chat/getting-started/kotlin',
            },
            {
              name: 'React UI Components',
              link: '/docs/chat/getting-started/react-ui-components',
            },
          ],
        },
        {
          name: 'SDK setup',
          link: '/docs/chat/setup',
        },
      ],
    },
    {
      name: 'Concepts',
      pages: [
        {
          name: 'Connections',
          link: '/docs/chat/connect',
        },
        {
          name: 'Rooms',
          link: '/docs/chat/rooms',
          index: true,
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
          name: 'Presence',
          link: '/docs/chat/rooms/presence',
        },
        {
          name: 'Occupancy',
          link: '/docs/chat/rooms/occupancy',
        },
        {
          name: 'Message reactions',
          link: '/docs/chat/rooms/message-reactions',
        },
        {
          name: 'Typing indicators',
          link: '/docs/chat/rooms/typing',
        },
        {
          name: 'Room reactions',
          link: '/docs/chat/rooms/reactions',
        },
      ],
    },
    {
      name: 'React UI Components',
      pages: [
        {
          name: 'Overview',
          link: '/docs/chat/react-ui-components',
          index: true,
        },
        {
          name: 'Setup',
          link: '/docs/chat/react-ui-components/setup',
        },
        {
          name: 'Providers and Hooks',
          link: '/docs/chat/react-ui-components/providers',
        },
        {
          name: 'Components',
          link: '/docs/chat/react-ui-components/components',
        },
        {
          name: 'Customisation',
          link: '/docs/chat/react-ui-components/component-styling',
          languages: [],
        },
      ],
    },
    {
      name: 'Moderation',
      pages: [
        {
          name: 'Introduction',
          link: '/docs/chat/moderation',
          index: true,
        },
        {
          name: 'Direct Integrations',
          pages: [
            {
              name: 'Hive (Model Only)',
              link: '/docs/chat/moderation/direct/hive-model-only',
            },
            {
              name: 'Hive (Dashboard)',
              link: '/docs/chat/moderation/direct/hive-dashboard',
            },
            {
              name: 'Tisane',
              link: '/docs/chat/moderation/direct/tisane',
            },
            {
              name: 'Bodyguard',
              link: '/docs/chat/moderation/direct/bodyguard',
            },
          ],
        },
        {
          name: 'Custom',
          pages: [
            {
              name: 'API Overview',
              link: '/docs/chat/moderation/custom',
            },
            {
              name: 'AWS Lambda',
              link: '/docs/chat/moderation/custom/lambda',
            },
          ],
        },
      ],
    },
    {
      name: 'Guides',
      pages: [
        {
          name: 'Livestream chat',
          link: '/docs/guides/chat/build-livestream',
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
        {
          link: 'https://sdk.ably.com/builds/ably/ably-chat-kotlin/main/dokka/',
          name: 'Kotlin SDK',
          external: true,
        },
        {
          link: 'https://sdk.ably.com/builds/ably/ably-chat-swift/main/AblyChat/documentation/ablychat/',
          name: 'Swift SDK',
          external: true,
        },
        {
          link: '/docs/api/chat-rest',
          name: 'REST API',
        },
      ],
    },
  ],
} satisfies NavProduct;
