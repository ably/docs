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
      },
      description:
        'A selection of tutorials demonstrating the use of the Ably Client library SDKs and the Ably REST API.',
    },
    {
      link: {
        href: '/download',
        text: 'Explore all SDKs',
      },
      description: 'Download official Ably client library SDKs.',
    },
    {
      link: {
        href: 'https://faqs.ably.com/',
        text: 'FAQs',
      },
      description: "Experiencing issues? Chances are we've got you covered in our FAQs.",
    },
    {
      link: {
        href: 'https://changelog.ably.com/',
        text: 'Changelog',
      },
      description: 'Changes to Ably products and to the Ably Client Library SDKs',
    },
    {
      link: {
        href: 'https://status.ably.io/',
        text: 'System Status',
      },
      description: 'Ably service health dashboard',
    },
  ],
  title: 'Resources Available',
};
