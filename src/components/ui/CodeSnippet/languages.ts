import { IconName } from 'src/components/Icon/types';

export interface LanguageInfo {
  label: string;
  icon: IconName;
  syntaxHighlighterKey?: string;
}

export type LanguageMap = Record<string, LanguageInfo>;

export const SDK_PREFIXES = ['realtime', 'rest', 'client', 'agent'] as const;
export type SDKType = (typeof SDK_PREFIXES)[number];

const languages: LanguageMap = {
  javascript: {
    label: 'JavaScript',
    icon: 'icon-tech-javascript',
    syntaxHighlighterKey: 'javascript',
  },
  typescript: {
    label: 'TypeScript',
    icon: 'icon-tech-typescript',
    syntaxHighlighterKey: 'typescript',
  },
  java: {
    label: 'Java',
    icon: 'icon-tech-java',
    syntaxHighlighterKey: 'java',
  },
  kotlin: {
    label: 'Kotlin',
    icon: 'icon-tech-kotlin',
    syntaxHighlighterKey: 'kotlin',
  },
  python: {
    label: 'Python',
    icon: 'icon-tech-python',
    syntaxHighlighterKey: 'python',
  },
  csharp: {
    label: 'C#',
    icon: 'icon-tech-csharp',
    syntaxHighlighterKey: 'csharp',
  },
  go: {
    label: 'Go',
    icon: 'icon-tech-go',
    syntaxHighlighterKey: 'go',
  },
  ruby: {
    label: 'Ruby',
    icon: 'icon-tech-ruby',
    syntaxHighlighterKey: 'ruby',
  },
  php: {
    label: 'PHP',
    icon: 'icon-tech-php',
    syntaxHighlighterKey: 'php',
  },
  nodejs: {
    label: 'Node.js',
    icon: 'icon-tech-nodejs',
    syntaxHighlighterKey: 'javascript',
  },
  react: {
    label: 'React',
    icon: 'icon-tech-react',
    syntaxHighlighterKey: 'javascript',
  },
  html: {
    label: 'HTML',
    icon: 'icon-tech-web',
    syntaxHighlighterKey: 'xml',
  },
  shell: {
    label: 'Shell',
    icon: 'icon-tech-web',
    syntaxHighlighterKey: 'bash',
  },
  json: {
    label: 'JSON',
    icon: 'icon-tech-json',
    syntaxHighlighterKey: 'json',
  },
  laravel: {
    label: 'Laravel',
    icon: 'icon-tech-laravel-broadcast',
    syntaxHighlighterKey: 'php',
  },
  xml: {
    label: 'XML',
    icon: 'icon-tech-web',
    syntaxHighlighterKey: 'xml',
  },
  sql: {
    label: 'SQL',
    icon: 'icon-tech-postgres',
    syntaxHighlighterKey: 'sql',
  },
  swift: {
    label: 'Swift',
    icon: 'icon-tech-swift',
    syntaxHighlighterKey: 'swift',
  },
  // New entries from languageInfo.ts
  cpp: {
    label: 'C++',
    icon: 'icon-tech-web',
    syntaxHighlighterKey: 'cpp',
  },
  dart: {
    label: 'Dart',
    icon: 'icon-tech-web',
    syntaxHighlighterKey: 'dart',
  },
  objc: {
    label: 'Objective-C',
    icon: 'icon-tech-objectivec',
    syntaxHighlighterKey: 'objc',
  },
  android: {
    label: 'Android',
    icon: 'icon-tech-android-full',
    syntaxHighlighterKey: 'kotlin',
  },
  flutter: {
    label: 'Flutter',
    icon: 'icon-tech-flutter',
    syntaxHighlighterKey: 'dart',
  },
};

export const stripSdkType = (lang: string) => {
  for (const prefix of SDK_PREFIXES) {
    const withUnderscore = `${prefix}_`;
    if (lang.startsWith(withUnderscore)) {
      return lang.slice(withUnderscore.length);
    }
  }
  return lang;
};

// Fallback function to handle languages not in the map
export const getLanguageInfo = (langKey: string): LanguageInfo => {
  const key = stripSdkType(langKey).toLowerCase();

  if (languages[key]) {
    return languages[key];
  }

  // Fallback for unknown languages
  return {
    label: langKey,
    icon: 'icon-tech-web',
    syntaxHighlighterKey: langKey,
  };
};

export default languages;
