import React, { FunctionComponent as FC, useContext } from 'react';
import { SingleValue } from 'react-select';
import {
  createLanguageHrefFromDefaults,
  getLanguageDefaults,
  HorizontalMenu,
  ReactSelectOption,
  Select,
} from 'src/components';
import { PageLanguageContext } from 'src/contexts';
import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../data/createPages/constants';
import { cacheVisitPreferredLanguage } from 'src/utilities';

import { dropdownContainer } from './LanguageNavigation.module.css';

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

const LanguageNavigation = ({ items, localChangeOnly, selectedLanguage, onSelect }: LanguageNavigationProps) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedPageLanguage = pageLanguage === DEFAULT_LANGUAGE ? DEFAULT_PREFERRED_LANGUAGE : pageLanguage;
  const actualSelectedLanguage = selectedLanguage ?? selectedPageLanguage;
  const options = items.map((item) => ({ label: item.content, value: item.props.language }));
  const value = options.find((option) => option.value === actualSelectedLanguage);

  const shouldUseLocalChanges = localChangeOnly && !!onSelect;
  const onSelectChange = shouldUseLocalChanges ? onSelect : changePageOnSelect(pageLanguage);

  return (
    <HorizontalMenu className="justify-end xl:justify-start h-48">
      {items.map(({ Component, props, content }, index) => (
        <Component {...props} key={index}>
          {content}
        </Component>
      ))}
      <div className={`${dropdownContainer} flex justify-end xl:hidden py-12 pl-16 pr-40`}>
        <Select options={options} value={value} isSearchable={false} onChange={onSelectChange} />
      </div>
    </HorizontalMenu>
  );
};

export default LanguageNavigation;
