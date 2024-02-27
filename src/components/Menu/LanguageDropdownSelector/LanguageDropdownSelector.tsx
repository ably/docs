import { navigate } from 'gatsby';
import Select, { CSSObjectWithLabel } from 'react-select';
import { useMediaQuery } from '@react-hook/media-query';
import { ReactSelectOption, createLanguageHrefFromDefaults, getLanguageDefaults } from 'src/components';
import { longLanguageLabels } from 'src/maps/language';
import { FormatOptionLabelWithLanguageLogo } from '../ReactSelectCustomComponents/Formatters/FormatOptionLabelWithLanguageLogo';
import { noIndicatorSeparator } from '../ReactSelectCustomComponents/no-indicator-separator';

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
import './styles.css';
import { usePageLanguage } from 'src/contexts';

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

  const { handleCurrentLanguageChange } = usePageLanguage();

  const selectedOption = options.find(isSelectedLanguage) || makeOptionFromLang(DEFAULT_PREFERRED_LANGUAGE);

  const customControlStyles = (base: CSSObjectWithLabel) => ({
    ...base,
    fontWeight: '500',
    boxShadow: 'none',
    cursor: 'pointer',
    fontFamily: `Manrope,
        ui-sans-serif,
        system-ui,
        -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica Neue,
        Arial,
        Noto Sans,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji,
        Segoe UI Symbol,
        Noto Color Emoji`,
    borderRadius: '0.375rem',
    flexShrink: '0',
    height: '2.25rem',
    width: '6.437rem',
  });

  const mobileControlStyles = (base: CSSObjectWithLabel) => ({
    ...customControlStyles(base),
    fontSize: '14px',
  });

  const desktopControlStyles = (base: CSSObjectWithLabel) => ({
    ...customControlStyles(base),
    padding: '0',
    marginRight: '1rem',
    fontSize: '16px',
  });

  const controlStyle = isDesktop ? desktopControlStyles : mobileControlStyles;

  const mobileValueStyles = (base: CSSObjectWithLabel) => ({ ...base, padding: '0.125rem' });
  const desktopValueStyles = (base: CSSObjectWithLabel) => ({ ...base, padding: '0.25rem' });
  const valueStyle = isDesktop ? desktopValueStyles : mobileValueStyles;
  // Need to check if JS is running in browser or non-browser env
  // document.body is only available in browsers, will not work in Node.js for example
  // document.body is needed for the Safari browsers to show the dropdown
  const setMenuPortalTarget = typeof window !== 'undefined' && typeof document !== 'undefined' ? document.body : null;

  return (
    <Select
      components={noIndicatorSeparator}
      menuPortalTarget={setMenuPortalTarget} //needed in Safari to stop the dropdown being partially hidden
      classNamePrefix="language-dropdown"
      menuPosition="fixed"
      isSearchable={false}
      styles={{
        control: controlStyle,
        option: optionStyles({ width: '15.625', marginRight: '1rem' }),
        dropdownIndicator: dropdownIndicatorStyles,
        groupHeading: groupHeadingStyles,
        menu: menuStyles({ right: 0, width: '18.75rem' }),
        menuList: menuListStyles,
        menuPortal: (base) => ({ ...base, zIndex: 9999 }), //needed in Safari to stop the dropdown being partially hidden
        group: groupStyles,
        valueContainer: valueStyle,
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

        handleCurrentLanguageChange(newLanguage);
        navigate(href);
      }}
      formatOptionLabel={(option) => (
        <FormatOptionLabelWithLanguageLogo
          label={option.label}
          value={option.value}
          selectedOption={selectedOption.label}
        />
      )}
    />
  );
};
