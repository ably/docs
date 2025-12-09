import { ProductName, ProductTitle } from '../../templates/template-data';

export const getMetaTitle = (title: string, product: ProductName): string => {
  const productTitle = ({
    channels: 'Channels',
    spaces: 'Ably Spaces',
    livesync: 'Ably LiveSync',
    liveSync: 'Ably LiveSync',
    chat: 'Ably Chat',
    liveobjects: 'Ably LiveObjects',
    liveObjects: 'Ably LiveObjects',
    'api-reference': 'API References',
    pub_sub: 'Ably Pub/Sub',
    pubsub: 'Ably Pub/Sub',
    home: 'Home',
  }[product] || 'Ably Realtime') as ProductTitle;

  return `${productTitle} | ${title}`;
};
