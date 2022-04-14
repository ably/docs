import React, { useContext } from 'react';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { navigate } from 'gatsby';
import '@ably/ui/core/styles.css';
import { getLanguageDefaults } from '../common/language-defaults';

const LanguageButton = ({ language }: { language: string }) => {
  const pageLanguage = useContext(PageLanguageContext);

  const { isLanguageDefault, isPageLanguageDefault, isActiveClassName } = getLanguageDefaults(language, pageLanguage);
  const href = isPageLanguageDefault ? `./?lang=${language}` : `./${isLanguageDefault ? '' : `?lang=${language}`}`;

  return (
    // 'active' className doesn’t need to be in the Tailwind config safe list as it isn’t part of the Tailwind ecosystem.
    <button className={`docs-menu-item-button ${isActiveClassName}`} onClick={() => navigate(href)}>
      {languageLabels[language] ?? language}
    </button>
  );
};

export default LanguageButton;
