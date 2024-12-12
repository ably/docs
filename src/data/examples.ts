export interface Example {
  name: string;
  description: string;
  languages: string[];
  products: string[];
  useCases: string[];
  image: string;
}

export interface Examples {
  examples: Example[];
  useCases: { [key: string]: { label: string } };
}

export default {
  examples: [
    {
      name: 'Avatar stack',
      description: 'Add a visual representation of a user’s presence, showing them as online and connected.',
      image: 'example-avatar-stack',
      languages: ['javascript', 'react', 'java'],
      products: ['pubsub'],
      useCases: ['live-chat'],
    },
    {
      name: 'Member location',
      description: 'Display the live location of a user within the app using this React starter-kit.',
      image: 'example-member-location',
      languages: ['javascript', 'react'],
      products: ['spaces'],
      useCases: ['live-chat'],
    },
    {
      name: 'Component locking',
      description: 'Add component locking to specific parts of your app with this React starter-kit.',
      image: 'example-component-locking',
      languages: ['javascript', 'react'],
      products: ['chat'],
      useCases: ['live-chat'],
    },
    {
      name: 'Room reactions',
      description: 'Use room reactions to enable users to express their feelings within a chat application.',
      image: 'example-room-reactions',
      languages: ['javascript', 'react'],
      products: ['chat'],
      useCases: ['live-chat'],
    },
    {
      name: 'Online status',
      description: 'Online statuses enable users to view who else is online and ready to chat.',
      image: '',
      languages: ['javascript', 'react'],
      products: ['chat'],
      useCases: ['live-chat'],
    },
    {
      name: 'Message history',
      description: 'Message history enables users to view messages that have been previously sent to the chat room.',
      image: '',
      languages: ['javascript', 'react'],
      products: ['chat'],
      useCases: ['live-chat'],
    },
    {
      name: 'Authentication with Ably Token',
      description: 'Use an Ably token to securely authenticate users within your application.',
      image: 'example-generate-token',
      languages: ['javascript', 'react'],
      products: ['pubsub'],
      useCases: ['live-chat'],
    },
  ] as Example[],
  useCases: {
    'live-chat': {
      label: 'Live Chat',
    },
    multiplayer: {
      label: 'Multiplayer collaboration',
    },
    'data-broadcast': {
      label: 'Data broadcast',
    },
    'data-sync': {
      label: 'Data synchronization',
    },
    notifications: {
      label: 'Notifications',
    },
  },
};
