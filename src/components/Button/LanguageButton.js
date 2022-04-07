import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_LANGUAGE } from '../../../data/createPages/constants';
import PageLanguageContext from '../../contexts/page-language-context';
import languageLabels from '../../maps/language';
import { navigate } from 'gatsby';
import '@ably/ui/core/styles.css';

const LanguageButton = ({ language }) => {
  const pageLanguage = useContext(PageLanguageContext);

  const languageIsDefault = language === DEFAULT_LANGUAGE;
  const pageIsDefault = pageLanguage === DEFAULT_LANGUAGE;

  const href = pageIsDefault ? `./?lang=${language}` : `./${languageIsDefault ? '' : `?lang=${language}`}`;

  const isActiveClassName = language === pageLanguage ? 'active' : 'inactive';

  return (
    // Extract to styles.css
    <button
      className={`mb-12 inline-block rounded-sm selected transition-colors text-white focus:outline-none ml-1 block py-8 px-12 no-underline text-menu2 bg-dark-grey hover:bg-gui-active rounded ${isActiveClassName}`}
      onClick={() => navigate(href)}
    >
      {languageLabels[language] ?? language}
    </button>
  );
};

LanguageButton.propTypes = {
  language: PropTypes.string,
};

export default LanguageButton;
