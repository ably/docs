import { navigate } from 'gatsby';
import { PREFERRED_LANGUAGE_KEY, safeWindow } from 'src/utilities';

export const cacheVisitPreferredLanguage = (isPageLanguageDefault: boolean, language: string, href: string) => {
  if (isPageLanguageDefault) {
    safeWindow.localStorage.clear();
  } else {
    safeWindow.localStorage.setItem(PREFERRED_LANGUAGE_KEY, language);
  }
  navigate(href);
};
