import { Example } from './types';

export const DEFAULT_EXAMPLE_LANGUAGES = ['javascript', 'react'];

export const examples: Example[] = [
  {
    id: 'chat-online-status',
    name: 'Online Status',
    description: 'Show online/offline status of users in a chat application.',
    products: ['chat'],
    layout: 'double-horizontal',
  },
  {
    id: 'chat-room-history',
    name: 'Room History',
    description: 'Display message history in chat rooms.',
    products: ['chat'],
    layout: 'single-horizontal',
  },
  {
    id: 'chat-room-messages',
    name: 'Chat Messages',
    description: 'Implement real-time messaging in chat rooms.',
    products: ['chat'],
    layout: 'double-vertical',
  },
  {
    id: 'chat-room-reactions',
    name: 'Room Reactions',
    description: 'Add emoji reactions to messages in chat rooms.',
    products: ['chat'],
    layout: 'double-vertical',
  },
  {
    id: 'chat-typing-indicator',
    name: 'Typing Indicator',
    description: 'Show when users are typing in a chat room.',
    products: ['chat'],
    layout: 'double-vertical',
  },
  {
    id: 'pub-sub-channel-messages',
    name: 'Channel Messages',
    description: 'Implement pub/sub messaging using channels.',
    products: ['pubsub'],
    layout: 'single-vertical',
  },
  {
    id: 'pub-sub-channel-state',
    name: 'Channel State',
    description: 'Monitor and react to channel state changes.',
    products: ['pubsub'],
    layout: 'single-vertical',
  },
  {
    id: 'pub-sub-connection-state',
    name: 'Connection State',
    description: 'Handle connection state changes in pub/sub applications.',
    products: ['pubsub'],
    layout: 'single-vertical',
  },
  {
    id: 'pub-sub-history',
    name: 'Message History',
    description: 'Retrieve historical messages from channels.',
    products: ['pubsub'],
    layout: 'single-vertical',
  },
  {
    id: 'pub-sub-message-encryption',
    name: 'Message Encryption',
    description: 'Implement end-to-end encryption for pub/sub messages.',
    products: ['pubsub'],
    layout: 'double-horizontal',
  },
  {
    id: 'pub-sub-occupancy',
    name: 'Channel Occupancy',
    description: 'Monitor the number of subscribers on a channel.',
    products: ['pubsub'],
    layout: 'single-horizontal',
  },
  {
    id: 'pub-sub-presence',
    name: 'Presence',
    description: 'Track presence of users on channels.',
    products: ['pubsub'],
    layout: 'double-horizontal',
  },
  {
    id: 'pub-sub-rewind',
    name: 'Rewind',
    description: 'Specify where to start a channel attachment from.',
    products: ['pubsub'],
    layout: 'single-vertical',
  },
  {
    id: 'spaces-avatar-stack',
    name: 'Avatar Stack',
    description: 'Display stacked avatars for users in a space.',
    products: ['spaces'],
    layout: 'double-vertical',
  },
  {
    id: 'spaces-component-locking',
    name: 'Component Locking',
    description: 'Implement component-level locking in collaborative spaces.',
    products: ['spaces'],
    layout: 'double-horizontal',
  },
  {
    id: 'spaces-live-cursors',
    name: 'Live Cursors',
    description: 'Show real-time cursor positions of users in a space.',
    products: ['spaces'],
    layout: 'double-vertical',
  },
  {
    id: 'spaces-member-location',
    name: 'Member Location',
    description: 'Track and display member locations within a space.',
    products: ['spaces'],
    layout: 'double-horizontal',
  },
];

export const products = {
  pubsub: {
    label: 'Pub/Sub',
  },
  chat: {
    label: 'Chat',
  },
  spaces: {
    label: 'Spaces',
  },
};

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
