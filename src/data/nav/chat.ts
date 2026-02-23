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
      name: 'About Chat',
      link: '/docs/chat',
      index: true,
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'Overview',
          link: '/docs/chat/getting-started',
          index: true,
        },
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
          name: 'Kotlin (Android)',
          link: '/docs/chat/getting-started/android',
        },
        {
          name: 'Kotlin (JVM)',
          link: '/docs/chat/getting-started/jvm',
        },
        {
          name: 'Swift',
          link: '/docs/chat/getting-started/swift',
        },
        {
          name: 'React UI Kit',
          link: '/docs/chat/getting-started/react-ui-kit',
        },
      ],
    },
    {
      name: 'Concepts',
      pages: [
        {
          name: 'SDK setup',
          link: '/docs/chat/setup',
        },
        {
          name: 'Authentication',
          link: '/docs/chat/authentication',
        },
        {
          name: 'Connections',
          link: '/docs/chat/connect',
        },
        {
          name: 'Rooms',
          link: '/docs/chat/rooms',
          index: true,
        },
        {
          name: 'Integrations',
          link: '/docs/chat/integrations',
        },
      ],
    },
    {
      name: 'Chat features',
      pages: [
        {
          name: 'Messages',
          link: '/docs/chat/rooms/messages',
        },
        {
          name: 'Message history',
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
        {
          name: 'Share media',
          link: '/docs/chat/rooms/media',
        },
        {
          name: 'Message replies',
          link: '/docs/chat/rooms/replies',
        },
      ],
    },
    {
      name: 'External storage and processing',
      pages: [
        {
          name: 'Overview',
          link: '/docs/chat/external-storage-and-processing',
          index: true,
        },
        {
          name: 'Data extraction',
          link: '/docs/chat/external-storage-and-processing/data-extraction',
        },
        {
          name: 'Data processing',
          link: '/docs/chat/external-storage-and-processing/data-processing',
        },
        {
          name: 'Data storage',
          link: '/docs/chat/external-storage-and-processing/data-storage',
        },
      ],
    },
    {
      name: 'React UI Kit',
      pages: [
        {
          name: 'Overview',
          link: '/docs/chat/react-ui-kit',
          index: true,
        },
        {
          name: 'Setup',
          link: '/docs/chat/react-ui-kit/setup',
        },
        {
          name: 'Providers and Hooks',
          link: '/docs/chat/react-ui-kit/providers',
        },
        {
          name: 'Components',
          link: '/docs/chat/react-ui-kit/components',
        },
        {
          name: 'Customisation',
          link: '/docs/chat/react-ui-kit/component-styling',
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
          name: 'Direct integrations',
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
            {
              name: 'Azure Content Safety',
              link: '/docs/chat/moderation/direct/azure',
            },
          ],
        },
        {
          name: 'Custom',
          pages: [
            {
              name: 'API overview',
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
      name: 'API references',
      pages: [
        {
          link: '/docs/chat/api',
          name: 'Overview',
        },
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
