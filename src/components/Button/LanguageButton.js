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
    // 'active' className is not a Tailwind class, so does not need to be purged.
    <button className={`docs-menu-item-button ${isActiveClassName}`} onClick={() => navigate(href)}>
      {languageLabels[language] ?? language}
    </button>
  );
};

LanguageButton.propTypes = {
  language: PropTypes.string,
};

export default LanguageButton;
