import React, { Dispatch, FunctionComponent as FC, SetStateAction, useContext, useState } from 'react';
import { SingleValue } from 'react-select';
import {
  createLanguageHrefFromDefaults,
  getFilteredLanguages,
  getLanguageDefaults,
  ReactSelectOption,
  Select,
} from 'src/components';
import { PageLanguageContext } from 'src/contexts';

import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE, SDK_INTERFACES } from '../../../../data/createPages/constants';
import { cacheVisitPreferredLanguage } from 'src/utilities';
import { dropdownContainer, horizontalNav } from './LanguageNavigation.module.css';
import SDKInterfacePanel from '../../SDKInterfacePanel/SDKInterfacePanel';

export interface LanguageNavigationComponentProps {
  language: string;
  sdkInterface?: string;
  onClick?: (event: { target: { value: string } }) => void;
  value?: string;
  isSelected?: boolean;
}

export interface LanguageNavigationProps {
  items: {
    Component: FC<LanguageNavigationComponentProps>;
    props: LanguageNavigationComponentProps;
    content: string;
  }[];
  localChangeOnly?: boolean;
  selectedLanguage?: string;
  onSelect?: (newValue: SingleValue<ReactSelectOption>) => void;
  SDKSelected?: string;
  allListOfLanguages?: string[];
  selectedSDKInterfaceTab: string;
  setSelectedSDKInterfaceTab: Dispatch<SetStateAction<string>>;
}

const changePageOnSelect = (pageLanguage: string) => (newValue: SingleValue<ReactSelectOption>) => {
  if (newValue) {
    const language = newValue.value;
    const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(
      getFilteredLanguages(language),
      pageLanguage,
    );

    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);
    cacheVisitPreferredLanguage(isPageLanguageDefault, language, href);
  }
};

const LanguageNavigation = ({
  items,
  localChangeOnly,
  selectedLanguage,
  onSelect,
  allListOfLanguages,
  selectedSDKInterfaceTab,
  setSelectedSDKInterfaceTab,
}: LanguageNavigationProps) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedPageLanguage = pageLanguage === DEFAULT_LANGUAGE ? DEFAULT_PREFERRED_LANGUAGE : pageLanguage;
  const actualSelectedLanguage = localChangeOnly ? selectedLanguage : selectedPageLanguage;
  const options = items.map((item) => ({ label: item.content, value: item.props.language }));
  const value = options.find((option) => option.value === actualSelectedLanguage);

  const shouldUseLocalChanges = localChangeOnly && !!onSelect;
  const onSelectChange = shouldUseLocalChanges ? onSelect : changePageOnSelect(pageLanguage);

  const isSDKInterFacePresent = allListOfLanguages
    ? checkIfLanguageHasSDKInterface(allListOfLanguages, SDK_INTERFACES)
    : [false];
  const sdkInterfaceAvailable = [];
  if (isSDKInterFacePresent && allListOfLanguages) {
    if (isLanguageSDKInterfaceIsAvailable(allListOfLanguages, 'realtime')) {
      sdkInterfaceAvailable.push('realtime');
    }
    if (isLanguageSDKInterfaceIsAvailable(allListOfLanguages, 'rest')) {
      sdkInterfaceAvailable.push('rest');
    }
  }

  return (
    <>
      {isSDKInterFacePresent.includes(true) ? (
        <SDKInterfacePanel
          selectedSDKInterfaceTab={selectedSDKInterfaceTab}
          setSelectedSDKInterfaceTab={setSelectedSDKInterfaceTab}
          sdkInterfaceAvailable={sdkInterfaceAvailable}
        />
      ) : null}

      {items.length >= 2 ? (
        <div className="border-b border-charcoal-grey w-full">
          <menu data-testid="menu" className={horizontalNav}>
            {items.map(({ Component, props, content }, index) => (
              <Component {...props} key={index}>
                {content}
              </Component>
            ))}
            <div className={dropdownContainer}>
              <Select options={options} value={value} isSearchable={false} onChange={onSelectChange} />
            </div>
          </menu>
        </div>
      ) : null}
    </>
  );
};

export default LanguageNavigation;

const checkIfLanguageHasSDKInterface = (allLanguage: string[], sdkInterfaces: string[]) =>
  allLanguage.map((language) => sdkInterfaces.includes(language.includes('_') ? language.split('_', 2)[0] : ''));

const isLanguageSDKInterfaceIsAvailable = (allLanguage: string[], sdkInterface: string) =>
  allLanguage.map((language) => language.includes(`${sdkInterface}_`)).includes(true);
