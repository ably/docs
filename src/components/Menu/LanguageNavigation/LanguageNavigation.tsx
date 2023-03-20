import React, { FunctionComponent as FC, useCallback, useContext, useState } from 'react';
import { SingleValue } from 'react-select';

import { createLanguageHrefFromDefaults, getLanguageDefaults, ReactSelectOption, Select } from 'src/components';
import { PageLanguageContext } from 'src/contexts';

import { DEFAULT_LANGUAGE, DEFAULT_PREFERRED_LANGUAGE } from '../../../../data/createPages/constants';
import { cacheVisitPreferredLanguage } from 'src/utilities';

import { dropdownContainer, horizontalNav } from './LanguageNavigation.module.css';
import APIKeyIndicator from '../../blocks/software/Code/ApiKeyIndicator';
import LanguageButton from '../../LanguageButton/LanguageButton';
import Icon from '@ably/ui/core/Icon';

export interface LanguageNavigationComponentProps {
  language: string;
  onClick?: (event: { target: { value: string } }) => void;
  value?: string;
  isSelected?: boolean;
  isSDK?: boolean;
  isEnabled?: boolean;
  isSDKSelected?: boolean;
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
}

const changePageOnSelect = (pageLanguage: string) => (newValue: SingleValue<ReactSelectOption>) => {
  if (newValue) {
    const language = newValue.value;
    const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(language, pageLanguage);
    const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, language);
    cacheVisitPreferredLanguage(isPageLanguageDefault, language, href);
  }
};

const SDKToolTip = ({ tooltip }: { tooltip: string }) => {
  const [tooltipHover, setTooltipHover] = useState(false);
  const showTooltipHover = useCallback(() => setTooltipHover(true), []);
  const hideTooltipHover = useCallback(() => setTooltipHover(false), []);
  return (
    <div
      className="flex flex-row w-full justify-start mt-2"
      onMouseOver={showTooltipHover}
      onMouseOut={hideTooltipHover}
    >
      <Icon name="icon-gui-info" size="1.25rem" color="mid-grey" additionalCSS="mt-12 ml-16" />
      {tooltipHover ? (
        <aside
          className="w-240 max-w-240 absolute box-border
          whitespace-pre-wrap bg-white shadow-tooltip rounded border border-light-grey
          text-cool-black font-sans p-16 text-center text-p3 leading-5 cursor-default -ml-160 -mt-88"
        >
          {tooltip}
        </aside>
      ) : null}
    </div>
  );
};

const SDKNavigation = ({
  items,
  localChangeOnly,
  selectedLanguage,
  onSelect,
  SDKSelected,
}: LanguageNavigationProps) => {
  return (
    <div className="bg-dark-grey border-charcoal-grey text-white border-b-4 flex justify-end">
      <menu data-testid="menuSDK" className="flex md:overflow-x-auto pl-0 justify-end md:justify-start h-48 mr-16 my-0">
        <LanguageButton language="Realtime" isSDK={true} isSDKSelected={SDKSelected === 'rt'} />
        <LanguageButton language="REST" isSDK={true} isSDKSelected={SDKSelected === 'rest'} />
        <SDKToolTip tooltip="Tooltips display informative text when users hover over, focus on, or tap an element." />
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
  const selectedSDK = selectedPageLanguage.split('_', 1);

  return (
    <>
      <SDKNavigation
        items={items}
        localChangeOnly={localChangeOnly}
        selectedLanguage={selectedLanguage}
        onSelect={onSelect}
        SDKSelected={selectedSDK[0]}
      />

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
