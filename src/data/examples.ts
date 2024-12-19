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
      languages: ['javascript', 'react'],
      products: ['spaces'],
      useCases: ['multiplayer'],
    },
    {
      name: 'Component locking',
      description: 'Add component locking to specific parts in the collaborative application.',
      image: 'example-component-locking',
      languages: ['javascript', 'react'],
      products: ['spaces'],
      useCases: ['multiplayer'],
    },
    {
      name: 'Live cursors',
      description: 'Display the live location of user’s cursors in the collaborative application.',
      image: 'example-live-cursors',
      languages: ['javascript', 'react'],
      products: ['spaces'],
      useCases: ['multiplayer'],
    },
    {
      name: 'Member location',
      description: 'Track the location of other users within an application.',
      image: 'example-member-location',
      languages: ['javascript', 'react'],
      products: ['spaces'],
      useCases: ['multiplayer'],
    },
    {
      name: 'Messages',
      description:
        'Enable users to have conversations with each other by sending and receiving messages in a chat room.',
      image: '',
      languages: ['javascript', 'react'],
      products: ['chat'],
      useCases: ['live-chat'],
    },
    {
      name: 'Typing indicator',
      description: 'Use typing indicators to make users aware of who is currently typing a message.',
      image: 'example-typing-indicator',
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
      useCases: ['data-broadcast'],
    },
    {
      name: 'Channels and messages',
      description:
        'Enable users to have conversations with each other by sending and receiving messages in a chat room.',
      image: '',
      languages: ['javascript', 'react'],
      products: ['pubsub'],
      useCases: ['data-broadcast'],
    },
    {
      name: 'History',
      description: 'History enables users to retrieve historical messages published to an application.',
      image: '',
      languages: ['javascript', 'react'],
      products: ['pubsub'],
      useCases: ['data-broadcast'],
    },
    {
      name: 'Presence',
      description: 'Presence enables users to see who else is online within an application.',
      image: 'example-presence',
      languages: ['javascript', 'react'],
      products: ['pubsub'],
      useCases: ['data-broadcast'],
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
