import { LanguageData } from './languages/types';
import { NavProduct } from './nav/types';

const productKeys = ['platform', 'pubsub', 'chat', 'spaces', 'liveSync', 'assetTracking'] as const;

export type ProductKey = (typeof productKeys)[number];

export type ProductData = {
  [index in ProductKey]: {
    nav: NavProduct;
    languages?: LanguageData;
  };
};
