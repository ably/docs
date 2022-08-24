import { DropdownData } from '../types';

export const ResourcesDropDownData: DropdownData = {
  summaryTitle: 'Resources',
  summaryDescription:
    'Find further information on how to use Ably and its SDKs, the latest feature updates and check the status of Ably services.',
  contents: [
    {
      link: {
        href: '/tutorials',
        text: 'Tutorials & Demos',
      },
      description:
        'Choose from a range of tutorials to get started with Ably, or watch a demo showcasing Ably in action.',
    },
    {
      link: {
        href: '/download',
        text: 'Download SDKs',
      },
      description: 'Explore and download Ably Client Library SDKs and other realtime protocol libraries.',
    },
    {
      link: {
        href: 'https://faqs.ably.com/',
        text: 'FAQs',
      },
      description: 'Search the Ably FAQs for answers to common questions.',
    },
    {
      link: {
        href: 'https://changelog.ably.com/',
        text: 'Changelog',
      },
      description: 'See the latest updates to Ably features and Client Library SDKs.',
    },
    {
      link: {
        href: 'https://status.ably.io/',
        text: 'System Status',
      },
      description: 'Check the status of all Ably services.',
    },
  ],
  title: 'Resources Available',
};
