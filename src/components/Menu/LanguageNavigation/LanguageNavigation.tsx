import React, { FunctionComponent as FC, useContext } from 'react';
import { SingleValue } from 'react-select';

import { createLanguageHrefFromDefaults, getLanguageDefaults, ReactSelectOption, Select } from 'src/components';
import { PageLanguageContext } from 'src/contexts';

import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../data/createPages/constants';
import { cacheVisitPreferredLanguage } from 'src/utilities';

import { dropdownContainer, horizontalNav } from './LanguageNavigation.module.css';
import LanguageButton from '../../LanguageButton/LanguageButton';
import Icon from '@ably/ui/core/Icon';

export interface LanguageNavigationComponentProps {
  language: string;
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
}

const changePageOnSelect = (pageLanguage: string) => (newValue: SingleValue<ReactSelectOption>) => {
  if (newValue) {
    const language = newValue.value;
    const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(language, pageLanguage);
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);
    cacheVisitPreferredLanguage(isPageLanguageDefault, language, href);
  }
};

const SDKNavigation = ({ items, localChangeOnly, selectedLanguage, onSelect }: LanguageNavigationProps) => {
  return (
    <div className="bg-dark-grey border-charcoal-grey text-white border-b-4 flex justify-end">
      <menu data-testid="menu" className={horizontalNav}>
        <LanguageButton language="Realtime" />
        <LanguageButton language="REST" />
        <Icon name="icon-gui-info" size="1.25rem" color="mid-grey" additionalCSS="mt-12 ml-48" />
      </menu>
    </div>
  );
};

const LanguageNavigation = ({ items, localChangeOnly, selectedLanguage, onSelect }: LanguageNavigationProps) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedPageLanguage = pageLanguage === DEFAULT_LANGUAGE ? DEFAULT_PREFERRED_LANGUAGE : pageLanguage;
  const actualSelectedLanguage = localChangeOnly ? selectedLanguage : selectedPageLanguage;
  const options = items.map((item) => ({ label: item.content, value: item.props.language }));
  const value = options.find((option) => option.value === actualSelectedLanguage);

  const shouldUseLocalChanges = localChangeOnly && !!onSelect;
  const onSelectChange = shouldUseLocalChanges ? onSelect : changePageOnSelect(pageLanguage);

  return items.length >= 2 ? (
    <>
      <SDKNavigation
        items={items}
        localChangeOnly={localChangeOnly}
        selectedLanguage={selectedLanguage}
        onSelect={onSelect}
      />
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
    </>
  ) : null;
};

export default LanguageNavigation;
