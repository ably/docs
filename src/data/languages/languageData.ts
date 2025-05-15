import { ProductKey } from '../types';
import { LanguageData } from './types';

export default {
  platform: {
    javascript: 2.9,
    nodejs: 2.9,
  },
  pubsub: {
    javascript: 2.9,
    nodejs: 2.9,
    react: 2.9,
    csharp: 1.2,
    flutter: 1.2,
    java: 1.2,
    kotlin: 1.2,
    objc: 1.2,
    php: 1.1,
    python: 2.0,
    ruby: 1.2,
    swift: 1.2,
    go: 1.2,
  },
  chat: {
    javascript: 0.7,
    react: 0.7,
    swift: 0.4,
    kotlin: 0.3,
  },
  spaces: {
    javascript: 0.4,
    react: 0.4,
  },
  liveObjects: {
    javascript: 2.9,
  },
  liveSync: {
    javascript: 0.4,
  },
  assetTracking: {
    javascript: 1.0,
    swift: 1.0,
    kotlin: 1.7,
  },
} satisfies Partial<Record<ProductKey, LanguageData>>;
