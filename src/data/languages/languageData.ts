import { ProductKey } from '../types';
import { LanguageData } from './types';

export default {
  platform: {
    javascript: '2.17',
    nodejs: '2.17',
    typescript: '2.17',
    react: '2.17',
    csharp: '1.2',
    flutter: '1.2',
    java: '1.6',
    kotlin: '1.6',
    objc: '1.2',
    php: '1.1',
    python: '3.1',
    ruby: '1.2',
    swift: '1.2',
    go: '1.3',
  },
  pubsub: {
    javascript: '2.17',
    nodejs: '2.17',
    typescript: '2.17',
    react: '2.17',
    csharp: '1.2',
    flutter: '1.2',
    java: '1.6',
    kotlin: '1.6',
    objc: '1.2',
    php: '1.1',
    python: '3.1',
    ruby: '1.2',
    swift: '1.2',
    go: '1.3',
    laravel: '1.0',
  },
  chat: {
    javascript: '1.2',
    react: '1.2',
    swift: '1.1',
    kotlin: '1.2',
    android: '1.2',
  },
  aiTransport: {
    javascript: '2.17',
    java: '1.6',
    python: '3.1',
  },
  spaces: {
    javascript: '0.5',
    react: '0.5',
  },
  liveObjects: {
    javascript: '2.17',
    swift: '0.3',
    java: '1.6',
  },
  liveSync: {
    javascript: '0.4',
  },
} satisfies Partial<Record<ProductKey, LanguageData>>;
