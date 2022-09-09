import React, { useContext, FunctionComponent as FC } from 'react';
import { navigate } from 'gatsby';
import cn from 'classnames';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from '../common/language-defaults';
import { safeWindow } from '../../utilities/browser/safe-window';
import { PREFERRED_LANGUAGE_KEY } from '../../utilities/language/constants';
import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';

import { button, isActive } from './LanguageButton.module.css';
import { storage } from 'src/utilities/browser/storage';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language }) => {
  const pageLanguage = useContext(PageLanguageContext);

  const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(language, pageLanguage);
  const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);

  const cacheVisitPreferredLanguage = () => {
    if (isPageLanguageDefault) {
      storage.clear();
    } else {
      storage.setItem(PREFERRED_LANGUAGE_KEY, language);
    }
    navigate(href);
  };

  return (
    <button
      className={cn(button, {
        [isActive]: isLanguageActive,
      })}
      onClick={cacheVisitPreferredLanguage}
    >
      {languageLabels[language] ?? language}
    </button>
  );
};

export default LanguageButton;
