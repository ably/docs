import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';

const isLanguageDefault = (language: string) => language === DEFAULT_LANGUAGE;

export const languageIsUsable = (language: string, pageLanguages: string[]) => pageLanguages.includes(language);

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
): string => {
  const languageParam = isPageLanguageDefault
    ? `./?lang=${language}`
    : `./${isLanguageDefault ? '' : `?lang=${language}`}`;

  return `${languageParam}`;
};

/*
 Need to filter the language if the language is rest_ or realtime_ ex: rest_javascript
 it needs to return the language only without the sdk interface indicator
 */
export const getTrimmedLanguage = (language: string) => (language.includes('_') ? language.split('_', 2)[1] : language);
