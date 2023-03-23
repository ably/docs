import React, { useState, MouseEvent, useEffect } from 'react';
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
  isSDKInterface,
}: {
  languages: string[];
  data?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  initialData: HtmlComponentPropsData;
  localChangeOnly: boolean;
  isSDKInterface: boolean;
}) => {
  const [selected, setSelected] = useState(initialData);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  useEffect(() => {
    setSelected(initialData);
  }, [initialData]);

  // if (isSDKInterface) {
  //   if (initialData != null) {
  //     console.log(initialData[0].attribs.lang);
  //   }
  // }
  if (isSDKInterface) {
    //   console.log(selected[0].attribs.lang);
    //  console.log(selectedLanguage);
  }

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

  const sdkInterfaceLanguages = !isEmpty(languages) ? languagesSDKInterface(languages) : [];
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

  /*
selectedLanguage = initial language selected when the page loads
selected = allData of selected language
allListOfLanguages = array of all language keys
 */

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

const languagesSDKInterface = (allLanguage: string[]) =>
  allLanguage
    .map((language) => (language.includes(`_`) ? language : ''))
    .filter(function (n: string) {
      return n;
    });
