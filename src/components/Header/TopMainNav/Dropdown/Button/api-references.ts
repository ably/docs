import { DOCUMENTATION_NAME } from '../../../../../../data/transform/constants';
import { DropdownData } from '../types';

export const APIReferencesDropdownData: DropdownData = {
  summaryTitle: 'API References',
  summaryDescription: 'API Reference section of the Ably developer documentation.',
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
      description: 'Client library realtime SDK.',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/sse`,
        text: 'SSE API',
      },
      description: 'The Ably Server-Sent Events API',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/rest-sdk`,
        text: 'REST SDK',
      },
      description: 'Client library REST SDK.',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/rest-api`,
        text: 'REST API',
      },
      description: 'A raw REST API is also provided as an alternative to a client SDK.',
    },
    {
      link: {
        href: `/${DOCUMENTATION_NAME}/api/control-api`,
        text: 'Control API',
      },
      description: 'Ably Control API is a REST API that enables you to manage your Ably account programmatically.',
    },
  ],
  title: 'API References Available',
};
