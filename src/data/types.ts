import { ContentData } from './content/types';
import { LanguageData } from './languages/types';
import { NavProduct } from './nav/types';

const pageKeys = ['homepage'] as const;
const productKeys = ['platform', 'pubsub', 'chat', 'spaces', 'liveObjects', 'liveSync', 'assetTracking'] as const;

export type ProductKey = (typeof productKeys)[number];
type PageKey = (typeof pageKeys)[number];

export type ProductData = {
  [index in ProductKey]: {
    nav: NavProduct;
    languages?: LanguageData;
    content?: ContentData;
  };
};

export type PageData = {
  [index in PageKey]: {
    content: ContentData;
  };
};
