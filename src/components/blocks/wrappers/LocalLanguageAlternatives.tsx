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
import { isObject } from 'lodash';
import { cleanIfLanguageHasSDKInterface } from '../software/Pre';

const LocalLanguageAlternatives = ({
  languages,
  data,
  initialData,
  localChangeOnly,
  selectedSDKInterfaceTab,
  setSelectedSDKInterfaceTab,
  setPreviousSDKInterfaceTab,
}: {
  languages: string[];
  data?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  initialData: HtmlComponentPropsData;
  localChangeOnly: boolean;
  selectedSDKInterfaceTab: string;
  setSelectedSDKInterfaceTab: Dispatch<SetStateAction<string>>;
  setPreviousSDKInterfaceTab: Dispatch<SetStateAction<string>>;
}) => {
  const [selected, setSelected] = useState(initialData);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  useEffect(() => {
    setSelected(initialData);
  }, [initialData]);

  const setLocalSelected = (value: string) => {
    const selectedLocalData = data ? data[value] : '';
    if (selectedLocalData !== null && isObject(selectedLocalData?.[0])) {
      /* when rest/realtime languages are passed from local they are not trimmed yet, so we need to trim here */
      const selectedLocalDataLang = selectedLocalData[0]?.attribs?.lang;
      const cleanSelectedLocalData = [
        {
          ...selectedLocalData[0],
          attribs: {
            lang: selectedLocalDataLang ? cleanIfLanguageHasSDKInterface(selectedLocalDataLang) : '',
          },
        },
      ];
      setSelected(cleanSelectedLocalData);
    }
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

      const languageSelected = lang || DEFAULT_PREFERRED_LANGUAGE;
      const filterLanguageForLangButton = languageSDKInterfaceClean(languageSelected, selectedSDKInterfaceTab);

      if (!localChangeOnly && filterLanguageForLangButton != '') {
        return {
          Component: LanguageButton,
          props: { language: filterLanguageForLangButton },
          content: languageLabels[lang] ?? lang,
        };
      }
      // Local button, if global language option doesn't exist

      const selectedLanguageFiltered = getFilteredLanguages(selectedLanguage);
      const languageFiltered = getFilteredLanguages(lang);
      const filterLanguageForMenuButton = languageSDKInterfaceClean(lang, selectedSDKInterfaceTab);

      return {
        Component: MenuItemButton,
        props: {
          language: filterLanguageForMenuButton != '' ? filterLanguageForMenuButton : lang,
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
        setPreviousSDKInterfaceTab={setPreviousSDKInterfaceTab}
      />
      <Html data={selected} />
    </>
  );
};

export default LocalLanguageAlternatives;

const languageSDKInterfaceClean = (language: string, selectedTab: string) =>
  language.includes(`_`) ? (language.includes(`${selectedTab}_`) ? language.split('_', 2)[1] : '') : language;
