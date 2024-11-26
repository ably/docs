import Icon from '@ably/ui/core/Icon';
import clsx from 'clsx';
import Select from 'react-select';
import { languageData } from 'src/data/languages';
import { languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';

type LanguageDropdownOptionProps = {
  data: {
    label: LanguageKey;
    value: string;
    version: number;
  };
};

const LanguageDropdownOption = (props: LanguageDropdownOptionProps, showLabel = true) => (
  <div className={clsx('flex gap-8 items-center', { 'p-8 pr-16': showLabel })}>
    <div className={clsx('flex items-center gap-8', { 'flex-1': showLabel })}>
      <Icon size="20px" name={`icon-tech-${props.data.label}`} />
      {showLabel ? (
        <a
          className="ui-gui-menu3 w-full text-neutral-1100 dark:text-neutral-200 hover:text-neutral-1200 dark:hover:text-neutral-300 transition-colors"
          href={`?lang=${props.data.label}`}
        >
          {languageInfo[props.data.label].label}
        </a>
      ) : null}
    </div>
    <span className="bg-neutral-200 dark:bg-neutral-1100 neutral-800 dark:neutral-500 font-bold px-4 py-2 rounded-md ui-gui-menu4 text-[11px] h-20">
      v{props.data.version.toFixed(1)}
    </span>
  </div>
);

export const LanguageDropdown = () => {
  const activeProduct = 'pubsub';
  const languageVersions = languageData[activeProduct];

  const options = Object.entries(languageVersions).map(([lang, version]) => ({
    label: lang as LanguageKey,
    value: `${lang}-${version}`,
    version,
  }));

  const queryParams = new URLSearchParams(typeof window !== `undefined` ? window.location.search : '');
  const langParam = queryParams.get('lang');
  const defaultOption = options.find((option) => option.label === langParam) || options[0];

  return (
    <Select
      options={options}
      defaultValue={defaultOption}
      classNames={{ control: () => '!border-none !inline-flex !cursor-pointer', valueContainer: () => '!p-0' }}
      components={{
        Option: LanguageDropdownOption,
        SingleValue: (props) => LanguageDropdownOption(props, false),
        IndicatorSeparator: null,
        Input: () => null,
      }}
    />
  );
};
