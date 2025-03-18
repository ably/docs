import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import Html from '../Html';
import { LanguageNavigation } from '../../Menu/LanguageNavigation';
import { LanguageButton } from 'src/components';
import { LanguageNavigationProps } from '../../Menu/LanguageNavigation';
import { HtmlComponentProps, HtmlComponentPropsData, ValidReactElement } from 'src/components/html-component-props';
import { languageInfo, languageLabel } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';

const LocalLanguageAlternatives = ({
  languages,
  data,
  initialData,
  isSDKInterface,
  selectedSDKInterfaceTab,
  setSelectedSDKInterfaceTab,
  setPreviousSDKInterfaceTab,
  selectedPageLanguage,
}: {
  languages: string[];
  data?: Record<string, string | HtmlComponentProps<ValidReactElement>[] | null>;
  initialData: HtmlComponentPropsData;
  isSDKInterface: boolean;
  selectedSDKInterfaceTab: string;
  setSelectedSDKInterfaceTab: Dispatch<SetStateAction<string>>;
  setPreviousSDKInterfaceTab: Dispatch<SetStateAction<string>>;
  selectedPageLanguage: string;
}) => {
  const [selected, setSelected] = useState(initialData);

  useEffect(() => {
    setSelected(initialData);
  }, [initialData]);

  const filteredLanguagesWithoutDefault = languages.filter((lang) => lang !== '');

  const hasLocalLanguageSelected = checkIfLocalLanguageSelected(
    filteredLanguagesWithoutDefault,
    selectedPageLanguage,
    selectedSDKInterfaceTab,
    isSDKInterface,
  );

  const languageItems = filteredLanguagesWithoutDefault.map((lang) => {
    // Site navigation button

    const languageSelected = lang;
    const filterLanguageForLangButton = languageSDKInterfaceClean(languageSelected, selectedSDKInterfaceTab);

    if (filterLanguageForLangButton != '') {
      return {
        Component: LanguageButton,
        props: {
          language: filterLanguageForLangButton,
          selectedLocalLanguage: selectedPageLanguage,
        },
        content: Object.keys(languageInfo).includes(lang) ? languageLabel(lang as LanguageKey) : lang,
      };
    }
  });

  return (
    <>
      <LanguageNavigation
        items={languageItems as LanguageNavigationProps['items']}
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

/* this function helps us to determine if an array of languages has a pageSelected present, a condition added if it is an SDK Interface, so we can compare the values correctly */
const checkIfLocalLanguageSelected = (
  languages: string[],
  selectedPageLanguage: string,
  selectedSDKInterfaceTab: string,
  isSDKInterface: boolean,
) =>
  languages.reduce((acc, lang) => {
    const localLanguageSelected = isSDKInterface
      ? lang === `${selectedSDKInterfaceTab}_${selectedPageLanguage}`
      : lang === selectedPageLanguage;
    return localLanguageSelected || acc;
  }, false);
