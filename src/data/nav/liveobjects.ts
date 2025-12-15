import { NavProduct } from './types';

export default {
  name: 'Ably LiveObjects',
  link: '/docs/liveobjects',
  icon: {
    closed: 'icon-gui-prod-liveobjects-outline',
    open: 'icon-gui-prod-liveobjects-solid',
  },
  content: [
    {
      name: 'About LiveObjects',
      link: '/docs/liveobjects',
      index: true,
    },
    {
      name: 'Getting started',
      pages: [
        {
          name: 'JavaScript',
          link: '/docs/liveobjects/quickstart/javascript',
        },
        {
          name: 'Swift',
          link: '/docs/liveobjects/quickstart/swift',
        },
        {
          name: 'Java',
          link: '/docs/liveobjects/quickstart/java',
        },
      ],
    },
    {
      name: 'Concepts',
      pages: [
        {
          name: 'Objects',
          link: '/docs/liveobjects/concepts/objects',
        },
        {
          name: 'Operations',
          link: '/docs/liveobjects/concepts/operations',
        },
        {
          name: 'Synchronization',
          link: '/docs/liveobjects/concepts/synchronization',
        },
      ],
    },
    {
      name: 'Object Types',
      pages: [
        {
          name: 'LiveCounter',
          link: '/docs/liveobjects/counter',
        },
        {
          name: 'LiveMap',
          link: '/docs/liveobjects/map',
        },
      ],
    },
    {
      name: 'Features',
      pages: [
        {
          name: 'Batch operations',
          link: '/docs/liveobjects/batch',
        },
        {
          name: 'Lifecycle events',
          link: '/docs/liveobjects/lifecycle',
        },
        {
          name: 'Typing',
          link: '/docs/liveobjects/typing',
        },
        {
          name: 'Using the REST API',
          link: '/docs/liveobjects/rest-api-usage',
          languages: ['javascript'],
        },
        {
          name: 'Inband objects',
          link: '/docs/liveobjects/inband-objects',
        },
        {
          name: 'Object storage',
          link: '/docs/liveobjects/storage',
        },
      ],
    },
  ],
  api: [
    {
      name: 'API references',
      pages: [
        {
          link: 'https://ably.com/docs/sdk/js/v2.0/interfaces/ably.Objects.html',
          name: 'JavaScript SDK',
          external: true,
        },
        {
          link: 'https://sdk.ably.com/builds/ably/ably-liveobjects-swift-plugin/main/AblyLiveObjects/documentation/ablyliveobjects/',
          name: 'Swift plugin',
          external: true,
        },
        {
          link: 'https://sdk.ably.com/builds/ably/ably-java/main/javadoc/io/ably/lib/objects/RealtimeObjects.html',
          name: 'Java SDK',
          external: true,
        },
        {
          link: '/docs/api/liveobjects-rest',
          name: 'REST API',
        },
      ],
    },
  ],
} satisfies NavProduct;
