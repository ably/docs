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
  dropdownIndicatorStyles,
  groupHeadingStyles,
  menuListStyles,
  menuStyles,
  optionStyles,
  groupStyles,
} from '../ReactSelectStyles';
import { safeWindow } from 'src/utilities';
import './styles.css';
import { useMediaQuery } from '@react-hook/media-query';

const makeOptionFromLang = (lang: string) => ({ label: longLanguageLabels[lang] ?? lang, value: lang });

const useScreenSize = () => {
  return useMediaQuery('only screen and (min-width: 1040px)');
};

export const LanguageDropdownSelector = ({
  language,
  languages,
  showDefaultLink,
}: {
  language: string;
  languages: string[];
  showDefaultLink: boolean;
}) => {
  const isDesktop = useScreenSize();
  const isSelectedLanguage = (option: ReactSelectOption) => option.value === language;
  const isNotSelectedLanguage = (option: ReactSelectOption) => option.value !== language;
  let options = languages.map(makeOptionFromLang);
  options = options.filter(({ value }) => !IGNORED_LANGUAGES_FOR_DISPLAY.includes(value));
  if (!showDefaultLink) {
    options = options.filter(({ value }) => value !== DEFAULT_LANGUAGE);
  }

  const selectedOption = options.find(isSelectedLanguage) || makeOptionFromLang(DEFAULT_PREFERRED_LANGUAGE);
  selectedOption.label = selectedOption.label.replace(/v\d+\.\d+/, 'none');

  const customControlStyles = (base: any) => ({
    ...base,
    fontWeight: '500',
    boxShadow: 'none',
    cursor: 'pointer',
    fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
    borderRadius: '0.375rem',
    flexShrink: '0',
  });

  const mobileControlStyles = (base: any) => ({
    ...base,
    customControlStyles,
    width: '160px',
    height: '40px',
    marginLeft: '24px',
    fontSize: '14px',
  });

  const desktopControlStyles = (base: any) => ({
    ...base,
    customControlStyles,
    width: '178px',
    height: '48px',
    marginRight: '14px',
    fontSize: '16px',
    border: '1.5px solid rgb(217, 217, 218)',
  });

  const controlStyle = isDesktop ? desktopControlStyles : mobileControlStyles;

  return (
    <Select
      components={noIndicatorSeparator}
      classNamePrefix="language-dropdown"
      menuPosition="fixed"
      isSearchable={false}
      styles={{
        control: controlStyle,
        option: optionStyles({ width: '250px', marginRight: '16px' }),
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
