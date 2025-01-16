import {
  assetTrackingNavData,
  chatNavData,
  liveSyncNavData,
  platformNavData,
  pubsubNavData,
  spacesNavData,
} from './nav';
import { languageData } from './languages';
import { PageData, ProductData } from './types';
import {
  homepageContentData,
  pubsubContentData,
  chatContentData,
  spacesContentData,
  liveSyncContentData,
  assetTrackingContentData,
} from './content/index';

export const productData = {
  platform: {
    nav: platformNavData,
    languages: languageData.platform,
  },
  pubsub: {
    nav: pubsubNavData,
    languages: languageData.pubsub,
    content: pubsubContentData,
  },
  chat: {
    nav: chatNavData,
    languages: languageData.chat,
    content: chatContentData,
  },
  spaces: {
    nav: spacesNavData,
    languages: languageData.spaces,
    content: spacesContentData,
  },
  liveSync: {
    nav: liveSyncNavData,
    languages: languageData.liveSync,
    content: liveSyncContentData,
  },
  assetTracking: {
    nav: assetTrackingNavData,
    languages: languageData.assetTracking,
    content: assetTrackingContentData,
  },
} satisfies ProductData;

export const pageData = {
  homepage: {
    content: homepageContentData,
  },
} satisfies PageData;
