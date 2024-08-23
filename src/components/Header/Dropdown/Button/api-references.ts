import { DropdownData } from '../types';

export const APIReferencesDropdownData: DropdownData = {
  summaryTitle: 'API References',
  summaryDescription:
    'Build applications with Ably using APIs that are simple to use, and that offer a consistent experience across languages.',
  summaryLink: {
    href: `/api`,
    text: 'Visit API References',
  },
  contents: [
    {
      link: {
        href: `/api/realtime-sdk`,
        text: 'Realtime SDK',
      },
      description:
        'Enable clients to maintain a persistent connection to Ably to publish and subscribe to messages, and to announce their presence on channels.',
    },
    {
      link: {
        href: `/api/sse`,
        text: 'SSE API',
      },
      description:
        'Subscribe to a realtime stream of events from Ably without having to install a realtime client library.',
    },
    {
      link: {
        href: `/api/rest-sdk`,
        text: 'REST SDK',
      },
      description: 'Interact with Ably’s REST API using a simple client library SDK.',
    },
    {
      link: {
        href: `/api/rest-api`,
        text: 'REST API',
      },
      description: 'Communicate directly with the Ably service over REST without installing a client library SDK.',
    },
    {
      link: {
        href: `/api/control-api`,
        text: 'Control API',
      },
      description:
        'Manage your Ably account programmatically and build web apps and command-line tools to administer your Ably realtime infrastructure.',
    },
    {
      link: {
        href: `https://sdk.ably.com/builds/ably/spaces/main/typedoc/index.html`,
        text: 'Spaces API',
      },
      description: 'Build collaborative environments in your application using the Spaces SDK.',
    },
    {
      link: {
        href: `https://sdk.ably.com/builds/ably/ably-chat-js/main/typedoc/index.html`,
        text: 'Chat API',
      },
      description: 'Build scalable chat features into your applications using the Chat SDK.',
    },
  ],
  title: 'API References Available',
};
