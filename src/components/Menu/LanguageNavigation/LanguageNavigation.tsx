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

import { drodownContainer } from './LanguageNavigation.module.css';

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
}

const LanguageNavigation = ({ items }: LanguageNavigationProps) => {
  const pageLanguage = useContext(PageLanguageContext);
  const selectedLanguage = pageLanguage === DEFAULT_LANGUAGE ? DEFAULT_PREFERRED_LANGUAGE : pageLanguage;
  const options = items.map((item) => ({ label: item.content, value: item.props.language }));
  const value = options.find((option) => option.value === selectedLanguage);

  return (
    <HorizontalMenu className="justify-end md:justify-start">
      {items.map(({ Component, props, content }, index) => (
        <Component {...props} key={index}>
          {content}
        </Component>
      ))}
      <div className={`${drodownContainer} flex justify-end md:hidden py-12 pl-16 pr-40`}>
        <Select
          options={options}
          value={value}
          isSearchable={false}
          onChange={(newValue: SingleValue<ReactSelectOption>) => {
            if (newValue) {
              const language = newValue.value;
              const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(language, pageLanguage);
              const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);
              cacheVisitPreferredLanguage(isPageLanguageDefault, language, href);
            }
          }}
        />
      </div>
    </HorizontalMenu>
  );
};

export default LanguageNavigation;
