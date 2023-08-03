import Select from 'react-select';
import { noIndicatorSeparator } from '../ReactSelectCustomComponents/no-indicator-separator';
import { FormatOptionLabelWithLanguageLogo } from '../ReactSelectCustomComponents/Formatters/FormatOptionLabelWithLanguageLogo';
import { longLanguageLabels } from '../../../maps/language';
import { ReactSelectOption } from 'src/components';
import { PREFERRED_LANGUAGE_KEY } from '../../../utilities';
import { createLanguageHrefFromDefaults, getLanguageDefaults } from '../../common';
import { navigate } from 'gatsby';
import {
  DEFAULT_LANGUAGE,
  DEFAULT_PREFERRED_LANGUAGE,
  IGNORED_LANGUAGES_FOR_DISPLAY,
} from '../../../../data/createPages/constants';
import {
  controlStyles,
  dropdownIndicatorStyles,
  groupHeadingStyles,
  menuListStyles,
  menuStyles,
  optionStyles,
  groupStyles,
} from '../ReactSelectStyles';
import { safeWindow } from 'src/utilities';
import './styles.css';

const makeOptionFromLang = (lang: string) => ({ label: longLanguageLabels[lang] ?? lang, value: lang });

export const LanguageDropdownSelector = ({
  language,
  languages,
  showDefaultLink,
}: {
  language: string;
  languages: string[];
  showDefaultLink: boolean;
}) => {
  const isSelectedLanguage = (option: ReactSelectOption) => option.value === language;
  const isNotSelectedLanguage = (option: ReactSelectOption) => option.value !== language;
  let options = languages.map(makeOptionFromLang);
  options = options.filter(({ value }) => !IGNORED_LANGUAGES_FOR_DISPLAY.includes(value));
  if (!showDefaultLink) {
    options = options.filter(({ value }) => value !== DEFAULT_LANGUAGE);
  }

  const selectedOption = options.find(isSelectedLanguage) || makeOptionFromLang(DEFAULT_PREFERRED_LANGUAGE);
  selectedOption.label = selectedOption.label.replace(/v\d+\.\d+/, 'none');

  return (
    <Select
      components={noIndicatorSeparator}
      classNamePrefix="language-dropdown"
      menuPosition="fixed"
      isSearchable={false}
      styles={{
        control: controlStyles({ width: '250px', marginLeft: 24 }),
        option: optionStyles({ width: '280px', marginRight: '16px' }),
        dropdownIndicator: dropdownIndicatorStyles,
        groupHeading: groupHeadingStyles,
        menu: menuStyles({ right: 0, width: '300px' }),
        menuList: menuListStyles,
        group: groupStyles,
      }}
      inputId={'language-menu'}
      instanceId="language-menu"
      value={selectedOption}
      options={[
        {
          label: 'Code Language:',
          options: options.filter(isNotSelectedLanguage),
        },
      ]}
      onChange={(newValue) => {
        const newLanguage = newValue?.value ?? DEFAULT_LANGUAGE;
        const { isLanguageDefault, isPageLanguageDefault } = getLanguageDefaults(newLanguage, language);
        const href = createLanguageHrefFromDefaults(isPageLanguageDefault, isLanguageDefault, newLanguage);
        if (isPageLanguageDefault) {
          safeWindow.localStorage.clear();
        } else {
          safeWindow.localStorage.setItem(PREFERRED_LANGUAGE_KEY, newLanguage);
        }
        navigate(href);
      }}
      formatOptionLabel={FormatOptionLabelWithLanguageLogo}
    />
  );
};
