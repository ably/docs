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
] as const;

export type LanguageKey = (typeof languageKeys)[number];

export type LanguageData = Partial<Record<LanguageKey, number>>;
