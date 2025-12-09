import { chatNavData, liveObjectsNavData, liveSyncNavData, platformNavData, pubsubNavData, spacesNavData } from './nav';
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
} satisfies ProductData;

export const pageData = {
  homepage: {
    content: homepageContentData,
  },
} satisfies PageData;
