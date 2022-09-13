import { navigate } from 'gatsby';
import { PREFERRED_LANGUAGE_KEY, storage } from 'src/utilities';

export const cacheVisitPreferredLanguage = (isPageLanguageDefault: boolean, language: string, href: string) => {
  if (isPageLanguageDefault) {
    storage.clear();
  } else {
    storage.setItem(PREFERRED_LANGUAGE_KEY, language);
  }
  navigate(href);
};
