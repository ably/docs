import { useEffect, useMemo, useState } from 'react';
import { useLocation } from '@reach/router';
import Badge from '@ably/ui/core/Badge';
import Icon from '@ably/ui/core/Icon';
import { IconName } from '@ably/ui/core/Icon/types';
import cn from '@ably/ui/core/utils/cn';
import { componentMaxHeight, HEADER_BOTTOM_MARGIN, HEADER_HEIGHT } from '@ably/ui/core/utils/heights';
import { track } from '@ably/ui/core/insights';
import { languageData, languageInfo } from 'src/data/languages';
import { LanguageKey } from 'src/data/languages/types';
import { useLayoutContext } from 'src/contexts/layout-context';
import { navigate } from '../Link';
import { LANGUAGE_SELECTOR_HEIGHT, INKEEP_ASK_BUTTON_HEIGHT } from './utils/heights';
import * as Select from '../ui/Select';
import { Skeleton } from '../ui/Skeleton';

type LanguageSelectorOptionData = {
  label: LanguageKey;
  value: string;
  version: string;
};

export const LanguageSelector = () => {
  const { activePage } = useLayoutContext();
  const location = useLocation();
  const languageVersions = languageData[activePage.product ?? 'pubsub'];
  const [value, setValue] = useState<string>('');

  const options: LanguageSelectorOptionData[] = useMemo(
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

  useEffect(() => {
    const defaultOption = options.find((option) => option.label === activePage.language) || options[0];
    if (defaultOption) {
      setValue(defaultOption.value);
    }
  }, [activePage.language, options]);

  const selectedOption = useMemo(() => options.find((option) => option.value === value), [options, value]);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);

    const option = options.find((opt) => opt.value === newValue);
    if (option) {
      track('language_selector_changed', {
        language: option.label,
        location: location.pathname,
      });
      navigate(`${location.pathname}?lang=${option.label}`);
    }
  };

  if (!selectedOption) {
    return <Skeleton className="w-[180px] h-5 my-[9px]" />;
  }

  const selectedLang = languageInfo[selectedOption.label];

  return (
    <div className="md:relative w-full text-right md:text-left -mt-1 md:mt-0 -mr-1 md:mr-0">
      <Select.Root value={value} onValueChange={handleValueChange}>
        <Select.Trigger
          className="border-none inline-flex cursor-pointer group/lang-dropdown focus-base rounded px-0"
          style={{ height: LANGUAGE_SELECTOR_HEIGHT }}
          aria-label="Select code language"
        >
          <div className="ui-text-label4 text-left leading-none w-full text-neutral-1100 dark:text-neutral-200 hover:text-neutral-1200 dark:hover:text-neutral-300 flex gap-2 items-center">
            <Icon size="20px" name={`icon-tech-${selectedLang?.alias ?? selectedOption.label}` as IconName} />
            <span className="text-neutral-900 dark:text-neutral-400 font-semibold">{selectedLang?.label}</span>
            <Badge color="neutral" size="xs" className="my-px">
              v{selectedOption.version}
            </Badge>
          </div>
          <Select.Icon className="flex items-center pl-2 text-red-orange cursor-pointer">
            <Icon
              name="icon-gui-chevron-down-micro"
              size="20px"
              additionalCSS="text-neutral-700 group-hover/lang-dropdown:text-neutral-1300 dark:text-neutral-600 dark:group-hover/lang-dropdown:text-neutral-000 transition-colors"
            />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden bg-neutral-000 shadow dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-lg ui-shadow-sm-soft z-40"
            position="popper"
            align="end"
            sideOffset={4}
          >
            <Select.Viewport
              className="p-2"
              style={{
                maxHeight: componentMaxHeight(
                  HEADER_HEIGHT,
                  HEADER_BOTTOM_MARGIN,
                  LANGUAGE_SELECTOR_HEIGHT,
                  INKEEP_ASK_BUTTON_HEIGHT,
                ),
              }}
            >
              <p className="ui-text-overline2 text-left p-2 pb-3 text-neutral-700 dark:text-neutral-600">
                Code Language
              </p>
              {options.map((option) => {
                const lang = languageInfo[option.label];
                return (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    className={cn(
                      'ui-text-label4 text-left leading-none w-full text-neutral-900 dark:text-neutral-400',
                      'hover:text-neutral-1300 dark:hover:text-neutral-000 transition-colors',
                      'p-2 hover:bg-neutral-100 dark:hover:bg-neutral-1200 cursor-pointer',
                      'flex gap-2 items-center rounded outline-none',
                      'focus:bg-neutral-100 dark:focus:bg-neutral-1200',
                      'data-[highlighted]:bg-neutral-100 dark:data-[highlighted]:bg-neutral-1200 focus-base',
                    )}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <Icon size="20px" name={`icon-tech-${lang?.alias ?? option.label}` as IconName} />
                      {lang?.label}
                    </div>
                    <Badge color="neutral" size="xs" className="my-px hover:bg-neutral-000 w-9 justify-center">
                      v{option.version}
                    </Badge>
                    {option.value === value ? (
                      <Select.ItemIndicator className="w-4 h-4 flex items-center justify-center">
                        <Icon
                          name="icon-gui-check-outline"
                          size="16px"
                          color="text-neutral-1000 dark:text-neutral-300"
                        />
                      </Select.ItemIndicator>
                    ) : (
                      <div className="w-4 h-4" aria-hidden={option.value === value} />
                    )}
                  </Select.Item>
                );
              })}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
