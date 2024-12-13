import Badge from '@ably/ui/core/Badge';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import cn from '@ably/ui/core/utils/cn';
import { useRef, useState } from 'react';
import Select from 'react-select';
import { languageData } from 'src/data/languages';
import { languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';
import { useOnClickOutside } from 'src/hooks';
import { useLayoutContext } from 'src/contexts/layout-context';
import Link from '../Link';

type LanguageDropdownOptionProps = {
  data: {
    label: LanguageKey;
    value: string;
    version: number;
  };
  isOption?: boolean;
  setMenuOpen: (menuOpen: boolean) => void;
  selectProps: {
    menuIsOpen: boolean;
  };
  langParam: string | null;
};

const LanguageDropdownOption = ({ isOption, setMenuOpen, langParam, ...props }: LanguageDropdownOptionProps) => (
  <div
    onClick={() => setMenuOpen(!props.selectProps.menuIsOpen)}
    className={cn('group/lang-dropdown flex gap-8 items-center rounded', {
      'p-8 hover:bg-neutral-100 dark:hover:bg-neutral-1200 mx-8 last:mb-8': isOption,
    })}
  >
    <div className={cn('flex items-center gap-8', { 'flex-1': isOption })}>
      <Icon size="20px" name={`icon-tech-${props.data.label}` as IconName} />
      {isOption ? (
        <Link
          className="ui-text-menu4 text-left leading-none w-full text-neutral-1100 dark:text-neutral-200 hover:text-neutral-1200 dark:hover:text-neutral-300 transition-colors"
          to={`?lang=${props.data.label}`}
        >
          {languageInfo[props.data.label].label}
        </Link>
      ) : null}
    </div>
    <Badge color="neutral" size="xs" className={cn({ 'group-hover/lang-dropdown:bg-neutral-000': isOption })}>
      v{props.data.version.toFixed(1)}
    </Badge>
    {isOption ? (
      <div className="w-16 h-16">
        {props.data.label === langParam ? <Icon name="icon-gui-tick" size="16px" color="text-neutral-1000" /> : null}
      </div>
    ) : null}
  </div>
);

export const LanguageDropdown = () => {
  const { activePageHierarchy, products } = useLayoutContext();

  const activeProduct = products[activePageHierarchy[0]]?.[0];
  const languageVersions = languageData[activeProduct ?? 'pubsub'];
  const [menuOpen, setMenuOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(() => setMenuOpen(false), selectRef);

  const options = Object.entries(languageVersions)
    .map(([lang, version]) => ({
      label: lang as LanguageKey,
      value: `${lang}-${version}`,
      version,
    }))
    .toSorted((a, b) => a.label.localeCompare(b.label));

  const queryParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const langParam = queryParams.get('lang');
  const defaultOption = options.find((option) => option.label === langParam) || options[0];

  return (
    <div ref={selectRef} className="absolute top-0 right-0 md:relative text-right w-full focus-base">
      <Select
        options={options}
        defaultValue={defaultOption}
        classNames={{
          control: () => '!border-none !inline-flex !cursor-pointer',
          valueContainer: () => '!p-0',
          menu: () => 'absolute right-0 w-240',
        }}
        styles={{
          menu: () => ({ boxShadow: 'none' }),
        }}
        tabIndex={0}
        menuIsOpen={menuOpen}
        components={{
          Option: (props) => (
            <LanguageDropdownOption {...props} setMenuOpen={setMenuOpen} langParam={langParam} isOption />
          ),
          SingleValue: (props) => <LanguageDropdownOption {...props} setMenuOpen={setMenuOpen} langParam={langParam} />,
          IndicatorSeparator: null,
          DropdownIndicator: (props) => (
            <div
              className="flex items-center pl-8 text-red-orange"
              onClick={() => setMenuOpen(!props.selectProps.menuIsOpen)}
            >
              <Icon name="icon-gui-chevron-down" size="20px" />
            </div>
          ),
          Input: () => null,
          MenuList: ({ children }) => (
            <div className="bg-neutral-000 shadow dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-lg ui-shadow-sm-soft">
              <p className="ui-text-code2 font-medium text-left p-8 m-8 mt-16 text-neutral-700 dark:text-neutral-600 uppercase">
                Code Language
              </p>
              {children}
            </div>
          ),
        }}
      />
    </div>
  );
};
