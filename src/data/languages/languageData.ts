import { ProductKey } from '../types';
import { LanguageData } from './types';

export default {
  platform: {} as LanguageData,
  pubsub: {
    javascript: 1.2,
    csharp: 1.2,
    flutter: 1.2,
    java: 1.2,
    react: 2.0,
    nodejs: 2.0,
    objectivec: 1.2,
    php: 1.1,
    python: 2.0,
    ruby: 1.2,
    swift: 1.2,
    go: 1.2,
  },
  chat: {
    javascript: 1.2,
  },
  spaces: {
    javascript: 1.2,
  },
  liveSync: {
    javascript: 1.2,
  },
  assetTracking: {
    javascript: 1.2,
  },
} satisfies Record<ProductKey, Partial<LanguageData>>;
