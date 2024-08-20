import { ProductName, ProductTitle } from '../../templates/template-data';

export const getMetaTitle = (title: string, product: ProductName): string => {
  const productTitle = ({
    channels: 'Channels',
    spaces: 'Spaces',
    livesync: 'LiveSync',
    chat: 'Chat',
    'asset-tracking': 'Asset Tracking',
    'api-reference': 'API References',
    pub_sub: 'Pub/Sub',
    home: 'Home',
  }[product] || 'Ably Realtime') as ProductTitle;

  return `${productTitle} | ${title}`;
};
