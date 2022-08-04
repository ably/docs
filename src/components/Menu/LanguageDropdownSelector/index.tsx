import React from 'react';
import Select from 'react-select';
import { optionStyles } from '../ReactSelectStyles/option-styles';
import { routeToPage } from '../route-to-page';
import { containerListStyles } from '../ReactSelectStyles/container-styles';
import { controlStyles } from '../ReactSelectStyles/control-styles';
import { dropdownIndicatorStyles } from '../ReactSelectStyles/dropdown-indicator-styles';
import { groupHeadingStyles } from '../ReactSelectStyles/group-heading-styles';
import { noIndicatorSeparator } from '../ReactSelectCustomComponents/no-indicator-separator';
import { FormatOptionLabelWithLanguageLogo } from '../ReactSelectCustomComponents/Formatters/FormatOptionLabelWithLanguageLogo';
import { initial } from 'lodash';
import { menuListStyles } from '../ReactSelectStyles/menu-list-styles';

export const LanguageDropdownSelector = ({
  language,
  languages,
  showDefaultLink,
}: {
  language: string;
  languages: string[];
  showDefaultLink: boolean;
}) => {
  return (
    <Select
      components={noIndicatorSeparator}
      classNamePrefix="react-select"
      menuPosition="fixed"
      styles={{
        control: controlStyles({ width: '256px' }),
        option: optionStyles({ width: '256px' }),
        dropdownIndicator: dropdownIndicatorStyles,
        container: containerListStyles,
        groupHeading: groupHeadingStyles,
        menuList: menuListStyles,
      }}
      inputId={'language-menu'}
      value={{ label: language, value: language }}
      options={[
        {
          label: 'Code Language:',
          options: languages.map((lang) => ({ label: lang, value: lang })),
        },
      ]}
      onChange={routeToPage}
      formatOptionLabel={FormatOptionLabelWithLanguageLogo}
    />
  );
};
