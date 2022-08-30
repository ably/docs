import React, { useContext, useState } from 'react';
import languageLabels from '../../../maps/language';
import { MenuItemButton } from '../../Menu/MenuItemButton';
import Html from '../Html';
import LanguageNavigation from '../../Menu/LanguageNavigation';
import { PageLanguagesContext } from '../../../contexts/page-language-context';
import LanguageButton from '../../Button/LanguageButton';
import { LanguageNavigationProps } from '../../Menu/LanguageNavigation';

const LocalLanguageAlternatives = ({
  languages,
  data,
  children,
}: {
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
      Component: MenuItemButton,
      props: {
        language: '',
        onClick,
        value: lang,
        isSelected: lang === selectedLanguage,
      },
      content: languageLabels[lang] ?? lang,
    };
  });

  return (
    <>
      <LanguageNavigation items={languageItems as LanguageNavigationProps['items']} />
      {selected}
    </>
  );
};

export default LocalLanguageAlternatives;
