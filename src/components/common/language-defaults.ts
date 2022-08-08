import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';

export const ACTIVE_LANGUAGE_BUTTON_CLASS_NAME = 'docs-menu-item-button-selected';
export const INACTIVE_LANGUAGE_BUTTON_CLASS_NAME = 'docs-menu-item-button';

type languageButtonClassName = typeof ACTIVE_LANGUAGE_BUTTON_CLASS_NAME | typeof INACTIVE_LANGUAGE_BUTTON_CLASS_NAME;

const isLanguageDefault = (language: string) => language === DEFAULT_LANGUAGE;
const getActiveClassName = (language: string, pageLanguage: string) =>
  language === pageLanguage ? ACTIVE_LANGUAGE_BUTTON_CLASS_NAME : INACTIVE_LANGUAGE_BUTTON_CLASS_NAME;

export const getLanguageDefaults = (
  language: string,
  pageLanguage: string,
): {
  isLanguageDefault: boolean;
  isPageLanguageDefault: boolean;
  maybeActiveButtonClassName: languageButtonClassName;
} => ({
  isLanguageDefault: isLanguageDefault(language),
  isPageLanguageDefault: isLanguageDefault(pageLanguage),
  maybeActiveButtonClassName: getActiveClassName(language, pageLanguage),
});

export const createLanguageHrefFromDefaults = (
  isPageLanguageDefault: boolean,
  isLanguageDefault: boolean,
  language: string,
): string => (isPageLanguageDefault ? `./?lang=${language}` : `./${isLanguageDefault ? '' : `?lang=${language}`}`);
