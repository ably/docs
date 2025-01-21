import { ProductKey } from '../types';
import { LanguageData } from './types';

export default {
  platform: {} as LanguageData,
  pubsub: {
    javascript: 2.6,
    nodejs: 2.6,
    react: 2.6,
    csharp: 1.2,
    flutter: 1.2,
    java: 1.2,
    objc: 1.2,
    php: 1.1,
    python: 2.0,
    ruby: 1.2,
    swift: 1.2,
    go: 1.2,
  },
  chat: {
    javascript: 0.3,
    react: 0.3,
    swift: 0.1,
    kotlin: 0.1,
  },
  spaces: {
    javascript: 0.4,
    react: 0.4,
  },
  liveSync: {
    javascript: 0.4,
  },
  assetTracking: {
    javascript: 1.0,
    swift: 1.0,
    kotlin: 1.7,
  },
} satisfies Record<ProductKey, Partial<LanguageData>>;
