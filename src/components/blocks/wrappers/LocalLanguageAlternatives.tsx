import React, { useState, MouseEvent, useEffect, Dispatch, SetStateAction } from 'react';
import languageLabels from '../../../maps/language';
import { MenuItemButton } from '../../Menu/MenuItemButton';
import Html from '../Html';
import { LanguageNavigation } from '../../Menu/LanguageNavigation';
import { getFilteredLanguages, LanguageButton, ReactSelectOption } from 'src/components';
import { LanguageNavigationProps } from '../../Menu/LanguageNavigation';
import { HtmlComponentProps, HtmlComponentPropsData, ValidReactElement } from 'src/components/html-component-props';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../data/createPages/constants';
import { SingleValue } from 'react-select';

import { isEmpty } from 'lodash';

const LocalLanguageAlternatives = ({
  languages,
  data,
  initialData,
  localChangeOnly,
  selectedSDKInterfaceTab,
  setSelectedSDKInterfaceTab,
}: {
  languages: string[];
  data?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  initialData: HtmlComponentPropsData;
  localChangeOnly: boolean;
  selectedSDKInterfaceTab: string;
  setSelectedSDKInterfaceTab: Dispatch<SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState(initialData);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  useEffect(() => {
    setSelected(initialData);
  }, [initialData]);

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

  /* filter only languages that are realtime or rest */
  const sdkInterfaceLanguages = !isEmpty(languages) ? languagesSDKInterface(languages, selectedSDKInterfaceTab) : [];
  languages = !isEmpty(sdkInterfaceLanguages) ? sdkInterfaceLanguages : languages;

  const languageItems = languages
    .filter((lang) => lang !== DEFAULT_LANGUAGE)
    .filter((lang) => lang !== '')
    .map((lang) => {
      // Site navigation button

      if (!localChangeOnly) {
        return {
          Component: LanguageButton,
          props: { language: lang || DEFAULT_PREFERRED_LANGUAGE },
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
        selectedSDKInterfaceTab={selectedSDKInterfaceTab}
        setSelectedSDKInterfaceTab={setSelectedSDKInterfaceTab}
      />
      <Html data={selected} />
    </>
  );
};

export default LocalLanguageAlternatives;

const languagesSDKInterface = (allLanguage: string[], selectedSDKInterface: string) =>
  allLanguage
    .map((language) => (language.includes(`${selectedSDKInterface}_`) ? language : ''))
    .filter(function (n: string) {
      return n;
    });
