import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';

const isLanguageDefault = (language: string) => language === DEFAULT_LANGUAGE;

export const getLanguageDefaults = (
  language: string,
  pageLanguage: string,
): {
  isLanguageDefault: boolean;
  isPageLanguageDefault: boolean;
  isLanguageActive: boolean;
} => ({
  isLanguageDefault: isLanguageDefault(language),
  isPageLanguageDefault: isLanguageDefault(pageLanguage),
  isLanguageActive: language === pageLanguage,
});

export const createLanguageHrefFromDefaults = (
  isPageLanguageDefault: boolean,
  isLanguageDefault: boolean,
  language: string,
): string => (isPageLanguageDefault ? `./?lang=${language}` : `./${isLanguageDefault ? '' : `?lang=${language}`}`);
