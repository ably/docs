import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';

const isLanguageDefault = (language: string) => language === DEFAULT_LANGUAGE;
const getActiveClassName = (language: string, pageLanguage: string) =>
  language === pageLanguage ? 'active' : 'inactive';

export const getLanguageDefaults = (
  language: string,
  pageLanguage: string,
): { isLanguageDefault: boolean; isPageLanguageDefault: boolean; isActiveClassName: string } => ({
  isLanguageDefault: isLanguageDefault(language),
  isPageLanguageDefault: isLanguageDefault(pageLanguage),
  isActiveClassName: getActiveClassName(language, pageLanguage),
});
