import { navigate } from 'gatsby';
import { PREFERRED_LANGUAGE_KEY, PREFERRED_INTERFACE_KEY, safeWindow } from 'src/utilities';

export const cacheVisitPreferredLanguage = (
  isPageLanguageDefault: boolean,
  language: string,
  href: string,
  sdkInterface: string,
) => {
  if (isPageLanguageDefault) {
    safeWindow.localStorage.clear();
  } else {
    safeWindow.localStorage.setItem(PREFERRED_LANGUAGE_KEY, language);
    safeWindow.localStorage.setItem(PREFERRED_INTERFACE_KEY, sdkInterface);
  }
  navigate(href);
};
