import { Example } from './types';

export const DEFAULT_EXAMPLE_LANGUAGES = ['javascript', 'react'];

export const examples: Example[] = [
  {
    id: 'auth-generate-jwt',
    name: 'Generate JWT',
    description: 'Learn how to generate JWT tokens for authentication with Ably.',
    image: 'example-auth-jwt',
    products: ['auth'],
    useCases: ['authentication'],
  },
  {
    id: 'auth-request-token',
    name: 'Request Token',
    description: 'Implement token-based authentication using Ably token requests.',
    image: 'example-auth-token',
    products: ['auth'],
    useCases: ['authentication'],
  },
  {
    id: 'chat-online-status',
    name: 'Online Status',
    description: 'Show online/offline status of users in a chat application.',
    image: 'example-chat-status',
    products: ['chat'],
    useCases: ['live-chat'],
  },
  {
    id: 'chat-room-history',
    name: 'Room History',
    description: 'Display message history in chat rooms.',
    image: 'example-chat-history',
    products: ['chat'],
    useCases: ['live-chat'],
  },
  {
    id: 'chat-room-messages',
    name: 'Room Messages',
    description: 'Implement real-time messaging in chat rooms.',
    image: 'example-chat-messages',
    products: ['chat'],
    useCases: ['live-chat'],
  },
  {
    id: 'chat-room-reactions',
    name: 'Room Reactions',
    description: 'Add emoji reactions to messages in chat rooms.',
    image: 'example-chat-reactions',
    products: ['chat'],
    useCases: ['live-chat'],
  },
  {
    id: 'chat-typing-indicator',
    name: 'Typing Indicator',
    description: 'Show when users are typing in a chat room.',
    image: 'example-chat-typing',
    products: ['chat'],
    useCases: ['live-chat'],
  },
  {
    id: 'pub-sub-channel-messages',
    name: 'Channel Messages',
    description: 'Implement pub/sub messaging using channels.',
    image: 'example-pubsub-messages',
    products: ['pubsub'],
    useCases: ['messaging'],
  },
  {
    id: 'pub-sub-channel-state',
    name: 'Channel State',
    description: 'Monitor and react to channel state changes.',
    image: 'example-pubsub-state',
    products: ['pubsub'],
    useCases: ['messaging'],
  },
  {
    id: 'pub-sub-connection-state',
    name: 'Connection State',
    description: 'Handle connection state changes in pub/sub applications.',
    image: 'example-pubsub-connection',
    products: ['pubsub'],
    useCases: ['messaging'],
  },
  {
    id: 'pub-sub-history',
    name: 'Message History',
    description: 'Retrieve historical messages from channels.',
    image: 'example-pubsub-history',
    products: ['pubsub'],
    useCases: ['messaging'],
  },
  {
    id: 'pub-sub-message-encryption',
    name: 'Message Encryption',
    description: 'Implement end-to-end encryption for pub/sub messages.',
    image: 'example-pubsub-encryption',
    products: ['pubsub'],
    useCases: ['messaging'],
  },
  {
    id: 'pub-sub-occupancy',
    name: 'Channel Occupancy',
    description: 'Monitor the number of subscribers on a channel.',
    image: 'example-pubsub-occupancy',
    products: ['pubsub'],
    useCases: ['messaging'],
  },
  {
    id: 'pub-sub-presence',
    name: 'Presence',
    description: 'Track presence of users on channels.',
    image: 'example-pubsub-presence',
    products: ['pubsub'],
    useCases: ['messaging'],
  },
  {
    id: 'spaces-avatar-stack',
    name: 'Avatar Stack',
    description: 'Display stacked avatars for users in a space.',
    image: 'example-spaces-avatars',
    products: ['spaces'],
    useCases: ['collaboration'],
  },
  {
    id: 'spaces-component-locking',
    name: 'Component Locking',
    description: 'Implement component-level locking in collaborative spaces.',
    image: 'example-spaces-locking',
    products: ['spaces'],
    useCases: ['collaboration'],
  },
  {
    id: 'spaces-live-cursors',
    name: 'Live Cursors',
    description: 'Show real-time cursor positions of users in a space.',
    image: 'example-spaces-cursors',
    products: ['spaces'],
    useCases: ['collaboration'],
  },
  {
    id: 'spaces-member-location',
    name: 'Member Location',
    description: 'Track and display member locations within a space.',
    image: 'example-spaces-location',
    products: ['spaces'],
    useCases: ['collaboration'],
  },
];

const useCasesList = [
  'authentication',
  'collaboration',
  'data-broadcast',
  'data-sync',
  'live-chat',
  'messaging',
  'notifications',
] as const;

export const useCases = {
  'live-chat': {
    label: 'Live Chat',
  },
  collaboration: {
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
  authentication: {
    label: 'Authentication',
  },
  messaging: {
    label: 'Messaging',
  },
} satisfies Record<UseCase, { label: string }>;

export type UseCase = (typeof useCasesList)[number];
