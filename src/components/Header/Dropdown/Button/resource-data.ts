import { DropdownData } from '../types';

export const ResourcesDropDownData: DropdownData = {
  summaryTitle: 'Resources',
  summaryDescription:
    "Ably's learning resources are available to help you with multiple SDKs, tutorials to implement with Ably for common realtime use-cases, and critical information for developers",
  contents: [
    {
      link: {
        href: '/tutorials',
        text: 'Tutorials & Demos',
        external: true,
      },
      description:
        'Choose from a range of tutorials to get started with Ably, or watch a demo showcasing Ably in action.',
    },
    {
      link: {
        href: '/download',
        text: 'Download SDKs',
        external: true,
      },
      description: 'Explore and download Ably Client Library SDKs and other realtime protocol libraries.',
    },
    {
      link: {
        href: 'https://faqs.ably.com/',
        text: 'FAQs',
        external: true,
      },
      description: 'Search the Ably FAQs for answers to common questions.',
    },
    {
      link: {
        href: 'https://changelog.ably.com/',
        text: 'Changelog',
        external: true,
      },
      description: 'See the latest updates to Ably features and Client Library SDKs.',
    },
    {
      link: {
        href: 'https://status.ably.io/',
        text: 'System Status',
        external: true,
      },
      description: 'Check the status of all Ably services.',
    },
  ],
  title: 'Resources Available',
};
