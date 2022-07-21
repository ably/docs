import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';

const isLanguageDefault = (language: string) => language === DEFAULT_LANGUAGE;
const getActiveClassName = (language: string, pageLanguage: string) =>
  language === pageLanguage ? 'docs-menu-item-button-active' : 'docs-menu-item-button';

export const getLanguageDefaults = (
  language: string,
  pageLanguage: string,
): { isLanguageDefault: boolean; isPageLanguageDefault: boolean; maybeActiveButtonClassName: string } => ({
  isLanguageDefault: isLanguageDefault(language),
  isPageLanguageDefault: isLanguageDefault(pageLanguage),
  maybeActiveButtonClassName: getActiveClassName(language, pageLanguage),
});
