import React, { useContext, useState } from 'react';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import languageLabels from '../../../maps/language';
import MenuItemButton, { SelectedMenuItemButton } from '../../Menu/MenuItem/MenuItemButton';
import Html from '../Html';
import LanguageNavigation from '../../Menu/LanguageNavigation';
import { PageLanguagesContext } from '../../../contexts/page-language-context';
import LanguageButton from '../../Button/LanguageButton';

const LocalLanguageAlternatives = ({
  language,
  languages,
  data,
  children,
}: {
  language: string;
  languages: string[];
  data: Record<string, string | any[] | null | undefined> | undefined;
  children: React.ReactNode;
}) => {
  const pageLanguages = useContext(PageLanguagesContext);

  const [selected, setSelected] = useState(children);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const onClick = ({ target: { value } }: { target: { value: string } }) => {
    setSelected(<Html data={data ? data[value] : ''} />);
    setSelectedLanguage(value);
  };

  const label = [...languages, DEFAULT_LANGUAGE].includes(language)
    ? `SELECT`
    : `No ${languageLabels[language] ?? language} example exists, select:`;
  const languageItems = languages.map((lang) => {
    // Site navigation button
    if (pageLanguages.includes(lang)) {
      return {
        Component: LanguageButton,
        props: { language: lang },
        content: languageLabels[lang] ?? lang,
      };
    }
    // Local button, if global language option doesn't exist
    return {
      Component: lang === selectedLanguage ? SelectedMenuItemButton : MenuItemButton,
      props: {
        language: '',
        onClick,
        value: lang,
      },
      content: languageLabels[lang] ?? lang,
    };
  });

  return (
    <>
      <LanguageNavigation label={label} items={languageItems} />
      {selected}
    </>
  );
};

export default LocalLanguageAlternatives;
