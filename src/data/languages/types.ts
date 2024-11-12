const languageKeys = [
  'javascript',
  'react',
  'java',
  'ruby',
  'python',
  'php',
  'shell',
  'csharp',
  'go',
  'html',
  'cpp',
  'dart',
  'swift',
  'objc',
  'nodejs',
  'json',
  'xml',
  'sql',
  'android',
  'flutter',
  'realtime',
  'rest',
] as const;

export type LanguageKey = (typeof languageKeys)[number];

export type LanguageData = Partial<Record<LanguageKey, number>>;

export type LanguageInfo = Partial<Record<LanguageKey, { label: string; syntaxHighlighterKey: string }>>;
