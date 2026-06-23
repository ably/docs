import { IconName } from 'src/components/Icon/types';

export const productNames = ['pubsub', 'chat', 'aiTransport', 'liveObjects', 'spaces', 'liveSync'] as const;

export type ProductName = (typeof productNames)[number];

type Products = Record<
  ProductName,
  {
    label: string;
    description: string;
    link?: string;
    icon?: IconName;
    hoverIcon?: IconName;
    unavailable?: boolean;
  }
>;

export const products: Products = {
  pubsub: {
    label: 'Pub/Sub',
    description: 'Low-level APIs to build any realtime experience.',
    icon: 'icon-product-pubsub-mono',
    hoverIcon: 'icon-product-pubsub',
    link: '/docs/channels',
  },
  chat: {
    label: 'Chat',
    description: 'Rapidly build chat features and roll-out at scale.',
    icon: 'icon-product-chat-mono',
    hoverIcon: 'icon-product-chat',
    link: '/docs/chat',
  },
  aiTransport: {
    label: 'AI Transport',
    description: 'Drop-in realtime continuity for Gen-2 AI experiences.',
    icon: 'icon-product-ai-transport-mono',
    hoverIcon: 'icon-product-ai-transport',
  },
  liveObjects: {
    label: 'LiveObjects',
    description: 'Sync application state across multiple devices.',
    icon: 'icon-product-liveobjects-mono',
    hoverIcon: 'icon-product-liveobjects',
    link: '/docs/liveobjects',
  },
  spaces: {
    label: 'Spaces',
    description: 'Create collaborative environments in a few lines of code.',
    icon: 'icon-product-spaces-mono',
    hoverIcon: 'icon-product-spaces',
    link: '/docs/spaces',
  },
  liveSync: {
    label: 'LiveSync',
    description: 'Sync database changes with frontend clients.',
    icon: 'icon-product-livesync-mono',
    hoverIcon: 'icon-product-livesync',
    link: '/docs/livesync',
  },
};
