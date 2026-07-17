import React, { useMemo } from 'react';
import * as Select from '@radix-ui/react-select';
import Icon from 'src/components/Icon';
import TooltipButton from './TooltipButton';
import { getLanguageInfo } from './languages';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type LanguageSelectorProps = {
  languages: string[];
  activeLanguage: string;
  onLanguageChange: (language: string) => void;
};

const LanguageSelector = ({ languages, activeLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const desktopLanguageElements = useMemo(
    () =>
      languages.map((lang) => {
        const active = activeLanguage === lang;
        const displayName = getLanguageInfo(lang).label;

        return (
          <TooltipButton
            key={lang}
            tooltip={displayName}
            active={active}
            onClick={() => onLanguageChange(lang)}
            icon={getLanguageInfo(lang).icon}
            variant="segmented"
            size="xs"
          >
            {displayName}
          </TooltipButton>
        );
      }),
    [languages, activeLanguage, onLanguageChange],
  );

  const mobileLanguageElements = useMemo(
    () =>
      languages.map((lang) => (
        <Select.Item
          key={lang}
          value={lang}
          className="relative flex items-center rounded px-2 py-1.5 text-14 text-neutral-1300 dark:text-neutral-000 select-none hover:bg-neutral-100 dark:hover:bg-neutral-1200 data-[highlighted]:outline-none data-[highlighted]:bg-neutral-100 dark:data-[highlighted]:bg-neutral-1200 focus-base"
        >
          <Select.ItemText asChild>
            <div className="flex items-center gap-2">
              <Icon name={getLanguageInfo(lang).icon} size="20px" />
              <span>{getLanguageInfo(lang).label}</span>
            </div>
          </Select.ItemText>
          <Select.ItemIndicator className="absolute right-2">
            <CheckIcon className="size-[16px]" aria-hidden />
          </Select.ItemIndicator>
        </Select.Item>
      )),
    [languages],
  );

  const mobileSelectValue = useMemo(
    () =>
      activeLanguage ? (
        <div className="flex items-center gap-2">
          <Icon name={getLanguageInfo(activeLanguage).icon} size="20px" />
          <span>{getLanguageInfo(activeLanguage).label}</span>
        </div>
      ) : null,
    [activeLanguage],
  );

  return (
    <div className="p-2 border-b border-neutral-300 dark:border-neutral-1100 overflow-x-auto">
      <div className="hidden sm:flex gap-1">{desktopLanguageElements}</div>

      <div className="sm:hidden w-full">
        <Select.Root value={activeLanguage || undefined} onValueChange={onLanguageChange}>
          <Select.Trigger
            className="w-full inline-flex items-center justify-between rounded-lg px-3 py-2 text-14 text-neutral-1300 dark:text-neutral-000 bg-neutral-200 dark:bg-neutral-1100 hover:bg-neutral-300 dark:hover:bg-neutral-1000 gap-1 border border-neutral-300 dark:border-neutral-900 focus-base"
            aria-label="Select language"
          >
            <Select.Value asChild>{mobileSelectValue}</Select.Value>
            <Select.Icon>
              <ChevronDownIcon className="size-[16px]" aria-hidden />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className="overflow-hidden rounded-md bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1100 shadow-md z-50 w-[var(--radix-select-trigger-width)]"
              position="popper"
            >
              <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-neutral-000 dark:bg-neutral-1300 text-neutral-1300 dark:text-neutral-000 cursor-default focus-base">
                <ChevronDownIcon className="size-[16px] rotate-180" aria-hidden />
              </Select.ScrollUpButton>

              <Select.Viewport className="p-1">{mobileLanguageElements}</Select.Viewport>

              <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-neutral-000 dark:bg-neutral-1300 text-neutral-1300 dark:text-neutral-000 cursor-default focus-base">
                <ChevronDownIcon className="size-[16px]" aria-hidden />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  );
};

export default LanguageSelector;
