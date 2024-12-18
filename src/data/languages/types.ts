import languageInfo from './languageInfo';

export type LanguageKey = (keyof typeof languageInfo)[number];

export type LanguageData = Partial<Record<LanguageKey, number>>;
