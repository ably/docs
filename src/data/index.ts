import {
  aiTransportNavData,
  assetTrackingNavData,
  chatNavData,
  liveObjectsNavData,
  liveSyncNavData,
  platformNavData,
  pubsubNavData,
  spacesNavData,
} from './nav';
import { languageData } from './languages';
import { PageData, ProductData } from './types';
import homepageContentData from './content/homepage';

export const productData = {
  platform: {
    nav: platformNavData,
    languages: languageData.platform,
  },
  pubsub: {
    nav: pubsubNavData,
    languages: languageData.pubsub,
  },
  chat: {
    nav: chatNavData,
    languages: languageData.chat,
  },
  aiTransport: {
    nav: aiTransportNavData,
    languages: languageData.aiTransport,
  },
  spaces: {
    nav: spacesNavData,
    languages: languageData.spaces,
  },
  liveObjects: {
    nav: liveObjectsNavData,
    languages: languageData.liveObjects,
  },
  liveSync: {
    nav: liveSyncNavData,
    languages: languageData.liveSync,
  },
  assetTracking: {
    nav: assetTrackingNavData,
    languages: languageData.assetTracking,
  },
} satisfies ProductData;

export const pageData = {
  homepage: {
    content: homepageContentData,
  },
} satisfies PageData;
