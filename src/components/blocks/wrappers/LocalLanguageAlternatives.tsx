import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import languageLabels from '../../../maps/language';
import Html from '../Html';
import { LanguageNavigation } from '../../Menu/LanguageNavigation';
import { getTrimmedLanguage, LanguageButton } from 'src/components';
import { LanguageNavigationProps } from '../../Menu/LanguageNavigation';
import { HtmlComponentProps, HtmlComponentPropsData, ValidReactElement } from 'src/components/html-component-props';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../data/createPages/constants';

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

  const filteredLanguagesWithoutDefault = languages
    .filter((lang) => lang !== DEFAULT_LANGUAGE)
    .filter((lang) => lang !== '');

  const hasLocalLanguageSelected = checkIfLocalLanguageSelected(
    filteredLanguagesWithoutDefault,
    selectedPageLanguage,
    selectedSDKInterfaceTab,
    isSDKInterface,
  );

  const languageItems = filteredLanguagesWithoutDefault.map((lang) => {
    // Site navigation button

    const languageSelected = lang || DEFAULT_PREFERRED_LANGUAGE;
    const filterLanguageForLangButton = languageSDKInterfaceClean(languageSelected, selectedSDKInterfaceTab);

    if (filterLanguageForLangButton != '') {
      return {
        Component: LanguageButton,
        props: {
          language: filterLanguageForLangButton,
          selectedLocalLanguage: hasLocalLanguageSelected ? selectedPageLanguage : getTrimmedLanguage(languages[0]),
        },
        content: languageLabels[lang] ?? lang,
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
