import React, { useState, MouseEvent } from 'react';
import languageLabels from '../../../maps/language';
import { MenuItemButton } from '../../Menu/MenuItemButton';
import Html from '../Html';
import { LanguageNavigation } from '../../Menu/LanguageNavigation';
import { getFilteredLanguages, LanguageButton, ReactSelectOption } from 'src/components';
import { LanguageNavigationProps } from '../../Menu/LanguageNavigation';
import { HtmlComponentProps, HtmlComponentPropsData, ValidReactElement } from 'src/components/html-component-props';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_INTERFACE } from '../../../../data/createPages/constants';
import { SingleValue } from 'react-select';
import { getSDKInterface } from './ConditionalChildrenLanguageDisplay';

const LocalLanguageAlternatives = ({
  languages,
  data,
  initialData,
  localChangeOnly,
}: {
  languages: string[];
  data?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  initialData: HtmlComponentPropsData;
  localChangeOnly: boolean;
}) => {
  const [selected, setSelected] = useState(initialData);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const setLocalSelected = (value: string) => {
    setSelected(data ? data[value] : '');
    setSelectedLanguage(getFilteredLanguages(value));
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
    .filter((lang) => lang !== '')
    .map((lang) => {
      // Site navigation button
      if (!localChangeOnly) {
        const selectedSDK = getSDKInterface();
        return {
          Component: LanguageButton,
          props: { language: lang, sdkInterface: selectedSDK || DEFAULT_PREFERRED_INTERFACE },
          content: languageLabels[lang] ?? lang,
        };
      }
      // Local button, if global language option doesn't exist

      const selectedLanguageFiltered = getFilteredLanguages(selectedLanguage);
      const languageFiltered = getFilteredLanguages(lang);
      return {
        Component: MenuItemButton,
        props: {
          language: lang,
          onClick,
          value: lang,
          isSelected: languageFiltered === selectedLanguageFiltered,
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
        allListOfLanguages={data ? Object.entries(data).map(([key]) => key) : []}
      />
      <Html data={selected} />
    </>
  );
};

export default LocalLanguageAlternatives;
