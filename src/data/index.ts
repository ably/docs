import {
  assetTrackingNavData,
  chatNavData,
  liveSyncNavData,
  platformNavData,
  pubsubNavData,
  spacesNavData,
} from './nav';
import { languageData } from './languages';
import { ProductData } from './types';

export default {
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
  liveSync: {
    nav: liveSyncNavData,
    languages: languageData.liveSync,
  },
  assetTracking: {
    nav: assetTrackingNavData,
    languages: languageData.assetTracking,
  },
} satisfies ProductData;
