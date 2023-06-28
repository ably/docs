import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import cn from 'classnames';
import { flatMapDeep } from 'lodash/fp';

import { noIndicatorSeparator } from 'src/components/Menu/ReactSelectCustomComponents/no-indicator-separator';
import {
  controlStyles,
  dropdownIndicatorStyles,
  menuListStyles,
  menuStyles,
  noPaddingValueContainerStyles,
  optionStyles,
  singleValueStyles,
} from 'src/components/Menu/ReactSelectStyles';

import { MenuData } from './menu-data';
import { rightSidebarMobile, withLanguageNavBar } from './RightSidebar.module.css';

const mapMenuDataToSelectOptions = (menuData: MenuData) => ({
  label: menuData.name,
  value: `#${menuData.id}`,
});

export const RightSidebarMobile = ({ menuData, languages }: { menuData: MenuData[]; languages: boolean }) => {
  const options = flatMapDeep(mapMenuDataToSelectOptions, menuData);
  const [selectedOption, setSelectedOption] = useState<SingleValue<{ label: string; value: string }>>(options[0]);

  return (
    <div
      className={cn(rightSidebarMobile, {
        [withLanguageNavBar]: languages,
      })}
    >
      <span className="pr-12 hidden xs:inline text-p3 sm:text-p1">On this page: </span>
      <Select
        components={noIndicatorSeparator}
        classNamePrefix="react-select"
        isSearchable={false}
        styles={{
          control: controlStyles({
            border: '0',
            boxShadow: 'none',
          }),
          option: optionStyles({ width: '240px', activeText: 'var(--color-active-orange)' }),
          dropdownIndicator: dropdownIndicatorStyles,
          menu: menuStyles({ width: '240px' }),
          singleValue: singleValueStyles,
          menuList: menuListStyles,
          valueContainer: noPaddingValueContainerStyles,
        }}
        inputId={'on-page-menu'}
        instanceId={'on-page-menu'}
        value={selectedOption}
        options={options}
        onChange={(newValue) => {
          setSelectedOption(newValue);
          if (newValue) {
            window.location.href = newValue.value;
          }
        }}
      />
    </div>
  );
};
