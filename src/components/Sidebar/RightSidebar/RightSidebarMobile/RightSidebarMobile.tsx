import React, { useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { flatMapDeep } from 'lodash/fp';
import { noIndicatorSeparator } from '../../../Menu/ReactSelectCustomComponents/no-indicator-separator';
import {
  controlStyles,
  dropdownIndicatorStyles,
  menuListStyles,
  menuStyles,
  optionStyles,
  singleValueStyles,
} from '../../../Menu/ReactSelectStyles';
import { noPaddingValueContainerStyles } from '../../../Menu/ReactSelectStyles/Versions/no-padding-value-container-styles';
import { MenuData } from '../menu-data';
import {
  DISTANCE_FROM_TOP_DESKTOP,
  DISTANCE_FROM_TOP_WITH_LANGUAGE_MENU_DESKTOP,
  NAV_HEIGHT_DESKTOP,
} from '../../../../utilities/layout/sticky-positioning-constants';

const mapMenuDataToSelectOptions = (menuData: MenuData) => ({
  label: menuData.name,
  value: `#${menuData.id}`,
});

export const RightSidebarMobile = ({ menuData, languages }: { menuData: MenuData[]; languages: boolean }) => {
  const options = flatMapDeep(mapMenuDataToSelectOptions, menuData);
  const [selectedOption, setSelectedOption] = useState<SingleValue<{ label: string; value: string }>>(options[0]);
  const distanceFromTop =
    NAV_HEIGHT_DESKTOP + (languages ? DISTANCE_FROM_TOP_WITH_LANGUAGE_MENU_DESKTOP : DISTANCE_FROM_TOP_DESKTOP);
  return (
    <div
      className="sticky bg-white col-span-3 flex flex-row items-center top-0 z-1 w-full h-48 md:hidden"
      style={{ top: distanceFromTop }}
    >
      <span className="pr-12 hidden xs:inline text-p3 sm:text-p1">On this page: </span>
      <Select
        components={noIndicatorSeparator}
        classNamePrefix="react-select"
        isSearchable={false}
        styles={{
          control: controlStyles({
            width: '160px',
            border: '0',
            boxShadow: 'none',
          }),
          option: optionStyles({ width: '160px', activeText: 'var(--color-active-orange)' }),
          dropdownIndicator: dropdownIndicatorStyles,
          menu: menuStyles,
          singleValue: singleValueStyles,
          menuList: menuListStyles,
          valueContainer: noPaddingValueContainerStyles,
        }}
        inputId={'on-page-menu'}
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
