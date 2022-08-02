import React, { useContext } from 'react';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { navigate } from 'gatsby';
import '../Menu/styles.css';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from '../common/language-defaults';
import { safeWindow } from '../../utilities/browser/safe-window';
import { PREFERRED_LANGUAGE_KEY } from '../../utilities/language/constants';

const LanguageButton = ({ language }: { language: string }) => {
  const pageLanguage = useContext(PageLanguageContext);

  const { isLanguageDefault, isPageLanguageDefault, maybeActiveButtonClassName } = getLanguageDefaults(
    language,
    pageLanguage,
  );
  const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);

  const cacheVisitPreferredLanguage = () => {
    if (isPageLanguageDefault) {
      safeWindow.localStorage.clear();
    } else {
      safeWindow.localStorage.setItem(PREFERRED_LANGUAGE_KEY, language);
    }
    navigate(href);
  };

  return (
    // 'active' className doesn’t need to be in the Tailwind config safe list as it isn’t part of the Tailwind ecosystem.
    <button className={maybeActiveButtonClassName} onClick={cacheVisitPreferredLanguage}>
      {languageLabels[language] ?? language}
    </button>
  );
};

export default LanguageButton;
