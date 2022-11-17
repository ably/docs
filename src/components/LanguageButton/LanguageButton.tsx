import React, { useContext, FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { PageLanguageContext } from 'src/contexts';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from 'src/components';
import languageLabels from 'src/maps/language';
import { cacheVisitPreferredLanguage } from 'src/utilities';

import { LanguageNavigationComponentProps } from '../Menu/LanguageNavigation';

import { button, isActive } from './LanguageButton.module.css';

const LanguageButton: FC<LanguageNavigationComponentProps> = ({ language }) => {
  const pageLanguage = useContext(PageLanguageContext);
  const { isLanguageDefault, isPageLanguageDefault, isLanguageActive } = getLanguageDefaults(language, pageLanguage);

  const handleClick = () => {
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);
    cacheVisitPreferredLanguage(isPageLanguageDefault, language, href);
  };

  return (
    <button
      className={cn(button, {
        [isActive]: isLanguageActive,
      })}
      onClick={handleClick}
    >
      {languageLabels[language] ?? language}
    </button>
  );
};

export default LanguageButton;
