import React, { useState, MouseEvent } from 'react';
import languageLabels from '../../../maps/language';
import { MenuItemButton } from '../../Menu/MenuItemButton';
import Html from '../Html';
import { LanguageNavigation } from '../../Menu/LanguageNavigation';
import { LanguageButton, ReactSelectOption } from 'src/components';
import { LanguageNavigationProps } from '../../Menu/LanguageNavigation';
import { HtmlComponentProps, ValidReactElement } from 'src/components/html-component-props';
import { DEFAULT_LANGUAGE } from '../../../../data/createPages/constants';
import { SingleValue } from 'react-select';

const LocalLanguageAlternatives = ({
  languages,
  data,
  localChangeOnly,
  children,
}: {
  languages: string[];
  data?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  localChangeOnly: boolean;
  children: React.ReactNode;
}) => {
  const [selected, setSelected] = useState(children);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const setLocalSelected = (value: string) => {
    setSelected(<Html data={data ? data[value] : ''} />);
    setSelectedLanguage(value);
  };

  const onClick = ({ currentTarget: { value } }: MouseEvent<HTMLButtonElement>) => {
    setLocalSelected(value);
  };

  const onSelect = (newValue: SingleValue<ReactSelectOption>) => {
    if (newValue) {
      setLocalSelected(newValue.value);
    }
  };

  const languageItems = languages
    .filter((lang) => lang !== DEFAULT_LANGUAGE)
    .map((lang) => {
      // Site navigation button
      if (!localChangeOnly) {
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
          language: lang,
          onClick,
          value: lang,
          isSelected: lang === selectedLanguage,
        },
        content: languageLabels[lang] ?? lang,
      };
    });

  return (
    <>
      <LanguageNavigation
        items={languageItems as LanguageNavigationProps['items']}
        localChangeOnly={localChangeOnly}
        selectedLanguage={selectedLanguage}
        onSelect={onSelect}
      />
      {selected}
    </>
  );
};

export default LocalLanguageAlternatives;
