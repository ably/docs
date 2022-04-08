import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import languageLabels from '../../../maps/language';
import MenuItemButton, { SelectedMenuItemButton } from '../../Menu/MenuItem/MenuItemButton';
import Html from '../Html';
import { ChildPropTypes } from '../../../react-utilities';
import LanguageNavigation from '../../Menu/LanguageNavigation';

const LocalLanguageAlternatives = ({ language, languages, data, children }) => {
  const [selected, setSelected] = useState(children);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const onClick = ({ target: { value } }) => {
    setSelected(<Html data={data[value]} />);
    setSelectedLanguage(value);
  };

  const label = language === DEFAULT_LANGUAGE ? `SELECT` : `No ${languageLabels[language]} example exists, select:`;
  const languageItems = languages.map((lang) => ({
    Component: lang === selectedLanguage ? SelectedMenuItemButton : MenuItemButton,
    props: {
      onClick,
      value: lang,
    },
    content: languageLabels[lang] ?? '',
  }));

  return (
    <>
      <LanguageNavigation label={label} items={languageItems} />
      {selected}
    </>
  );
};

LocalLanguageAlternatives.propTypes = {
  language: PropTypes.string,
  languages: PropTypes.array,
  data: PropTypes.object,
  children: ChildPropTypes,
};

export default LocalLanguageAlternatives;
