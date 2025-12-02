import { ProductKey } from '../types';
import { LanguageData } from './types';

export default {
  platform: {
    javascript: '2.11',
    nodejs: '2.11',
  },
  pubsub: {
    javascript: '2.11',
    nodejs: '2.11',
    typescript: '2.11',
    react: '2.11',
    csharp: '1.2',
    flutter: '1.2',
    java: '1.4',
    kotlin: '1.4',
    objc: '1.2',
    php: '1.1',
    python: '2.1',
    ruby: '1.2',
    swift: '1.2',
    go: '1.3',
    laravel: '1.0',
  },
  chat: {
    javascript: '1.1',
    react: '1.1',
    swift: '1.0',
    kotlin: '1.0',
  },
  aiTransport: {
    javascript: '2.11',
  },
  spaces: {
    javascript: '0.4',
    react: '0.4',
  },
  liveObjects: {
    javascript: '2.11',
    swift: '0.2',
    java: '1.4',
  },
  liveSync: {
    javascript: '0.4',
  },
  assetTracking: {
    javascript: '1.0',
    swift: '1.0',
    kotlin: '1.7',
  },
} satisfies Partial<Record<ProductKey, LanguageData>>;
