import { DOCUMENTATION_NAME } from '../../../../../../data/transform/constants';
import { DropdownData } from '../types';

export const APIReferencesDropdownData: DropdownData = {
  summaryTitle: 'API References',
  summaryDescription: 'Build applications with Ably using APIs that are simple to use, and that offer a consistent experience across languages.',
  summaryLink: {
    href: `/${DOCUMENTATION_NAME}/api`,
    text: 'Visit API References',
  },
  contents: [
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/realtime-sdk`,
        text: 'Realtime SDK',
      },
      description: 'Enable clients to maintain a persistent connection to Ably to publish and subscribe to messages, and to announce their presence on channels.',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/sse`,
        text: 'SSE API',
      },
      description: 'Subscribe to a realtime stream of events from Ably without having to install a realtime client library.',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/rest-sdk`,
        text: 'REST SDK',
      },
      description: 'Interact with Ably’s REST API using a simple client library SDK.',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/rest-api`,
        text: 'REST API',
      },
      description: 'Communicate directly with the Ably service over REST without installing a client library SDK.',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/control-api`,
        text: 'Control API',
      },
      description: 'Manage your Ably account programmatically and build web apps and command-line tools to administer your Ably realtime infrastructure.',
    },
  ],
  title: 'API References Available',
};
