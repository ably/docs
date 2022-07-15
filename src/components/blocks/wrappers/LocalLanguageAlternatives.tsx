import React, { useContext, useState } from 'react';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import languageLabels from '../../../maps/language';
import MenuItemButton, { SelectedMenuItemButton } from '../../Menu/MenuItem/MenuItemButton';
import Html from '../Html';
import LanguageNavigation from '../../Menu/LanguageNavigation';
import PageLanguageContext from '../../../contexts/page-language-context';

const LocalLanguageAlternatives = ({
  language,
  languages,
  data,
  children,
}: {
  language: string;
  languages: string[];
  data: Record<string, string | unknown[] | null | undefined>;
  children: React.ReactNode;
}) => {
  const pageLanguage = useContext(PageLanguageContext);

  const [selected, setSelected] = useState(children);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const onClick = ({ target: { value } }: { target: { value: string } }) => {
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
    content: languageLabels[lang] ?? lang,
  }));

  return (
    <>
      <LanguageNavigation label={label} items={languageItems} />
      {selected}
    </>
  );
};

export default LocalLanguageAlternatives;
