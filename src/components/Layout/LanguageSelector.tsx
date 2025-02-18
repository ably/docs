import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from '@reach/router';
import Select from 'react-select';
import Badge from '@ably/ui/core/Badge';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import cn from '@ably/ui/core/utils/cn';
import { languageData, languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';
import { useOnClickOutside } from 'src/hooks';
import { useLayoutContext } from 'src/contexts/layout-context';
import { navigate } from '../Link';
import {
  componentMaxHeight,
  HEADER_HEIGHT,
  HEADER_BOTTOM_MARGIN,
  LANGUAGE_SELECTOR_HEIGHT,
  INKEEP_ASK_BUTTON_HEIGHT,
} from './utils/heights';

type LanguageSelectorOptionData = {
  label: LanguageKey;
  value: string;
  version: number;
};

type LanguageSelectorOptionProps = {
  data: LanguageSelectorOptionData;
  isOption?: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  selectProps: {
    menuIsOpen: boolean;
  };
  langParam: string | null;
};

const LanguageSelectorOption = ({ isOption, setMenuOpen, langParam, ...props }: LanguageSelectorOptionProps) => {
  const lang = languageInfo[props.data.label];
  const location = useLocation();

  return (
    <div
      className={cn(
        'ui-text-menu4 text-left leading-none w-full text-neutral-1100 dark:text-neutral-200 hover:text-neutral-1200 dark:hover:text-neutral-300 group/lang-dropdown flex gap-8 items-center rounded',
        {
          'p-8 hover:bg-neutral-100 dark:hover:bg-neutral-1200 cursor-pointer': isOption,
        },
      )}
      onClick={() => {
        if (isOption) {
          navigate(`${location.pathname}?lang=${props.data.label}`);
        }

        setMenuOpen(!props.selectProps.menuIsOpen);
      }}
      role="menuitem"
    >
      <div className={cn('flex items-center gap-8', { 'flex-1': isOption })}>
        <Icon size="20px" name={`icon-tech-${lang?.alias ?? props.data.label}` as IconName} />
        {isOption ? lang?.label : null}
      </div>
      <Badge color="neutral" size="xs" className={cn('my-1', { 'group-hover/lang-dropdown:bg-neutral-000': isOption })}>
        v{props.data.version.toFixed(1)}
      </Badge>
      {isOption ? (
        <div className="w-16 h-16">
          {props.data.label === langParam ? (
            <Icon name="icon-gui-check-outline" size="16px" color="text-neutral-1000" />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export const LanguageSelector = () => {
  const { activePage, products } = useLayoutContext();
  const location = useLocation();
  const activeProduct = products[activePage.tree[0].index]?.[0];
  const languageVersions = languageData[activeProduct ?? 'pubsub'];
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<LanguageSelectorOptionData | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(() => setMenuOpen(false), selectRef);

  const options = useMemo(
    () =>
      Object.entries(languageVersions)
        .map(([lang, version]) => ({
          label: lang as LanguageKey,
          value: `${lang}-${version}`,
          version,
        }))
        .filter((option) => (activePage.languages ? activePage.languages.includes(option.label) : true)),
    [activePage.languages, languageVersions],
  );

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const langParam = queryParams.get('lang');

  useEffect(() => {
    if (langParam && !options.some((option) => option.label === langParam)) {
      queryParams.delete('lang');
      navigate(`${location.pathname}?${queryParams.toString()}`, { replace: true });
    }
  }, [langParam, options, location.pathname, queryParams]);

  useEffect(() => {
    const defaultOption = options.find((option) => option.label === langParam) || options[0];
    setSelectedOption(defaultOption);
  }, [langParam, options]);

  return (
    <div ref={selectRef} className="absolute top-0 right-0 md:relative w-full text-right md:text-left mb-24 focus-base">
      <Select
        options={options}
        value={selectedOption}
        onChange={(option) => setSelectedOption(option)}
        classNames={{
          control: () => '!border-none !inline-flex !cursor-pointer group/lang-dropdown',
          valueContainer: () => '!p-0',
          menu: () => 'absolute right-0 w-240 z-10',
        }}
        styles={{
          control: () => ({ height: LANGUAGE_SELECTOR_HEIGHT }),
          menu: () => ({ boxShadow: 'none' }),
        }}
        tabIndex={0}
        menuIsOpen={menuOpen}
        components={{
          Option: (props) => (
            <LanguageSelectorOption {...props} setMenuOpen={setMenuOpen} langParam={langParam} isOption />
          ),
          SingleValue: (props) => <LanguageSelectorOption {...props} setMenuOpen={setMenuOpen} langParam={langParam} />,
          IndicatorSeparator: null,
          DropdownIndicator: (props) => (
            <button
              className="flex items-center pl-8 text-red-orange"
              onClick={() => setMenuOpen(!props.selectProps.menuIsOpen)}
              aria-label="Toggle language dropdown"
            >
              <Icon
                name="icon-gui-chevron-down-micro"
                size="20px"
                additionalCSS="text-neutral-700 group-hover/lang-dropdown:text-neutral-1300 dark:text-neutral-600 dark:group-hover/lang-dropdown:text-neutral-000 transition-colors"
              />
            </button>
          ),
          Input: () => null,
          MenuList: ({ children }) => (
            <div
              className="overflow-y-scroll bg-neutral-000 shadow dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-lg ui-shadow-sm-soft p-8"
              style={{
                maxHeight: componentMaxHeight(
                  HEADER_HEIGHT,
                  HEADER_BOTTOM_MARGIN,
                  LANGUAGE_SELECTOR_HEIGHT,
                  INKEEP_ASK_BUTTON_HEIGHT,
                ),
              }}
              role="menu"
            >
              <p className="ui-text-overline2 py-16 px-8 text-neutral-700 dark:text-neutral-600">Code Language</p>
              {children}
            </div>
          ),
        }}
      />
    </div>
  );
};
