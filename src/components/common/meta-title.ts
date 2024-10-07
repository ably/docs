import { ProductName, ProductTitle } from '../../templates/template-data';

export const getMetaTitle = (title: string, product: ProductName): string => {
  const productTitle = ({
    channels: 'Channels',
    spaces: 'Ably Spaces',
    livesync: 'Ably LiveSync',
    chat: 'Ably Chat',
    'asset-tracking': 'Ably Asset Tracking',
    'api-reference': 'API References',
    pub_sub: 'Ably Pub/Sub',
    home: 'Home',
  }[product] || 'Ably Realtime') as ProductTitle;

  return `${productTitle} | ${title}`;
};
