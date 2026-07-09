import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Tooltip from '@radix-ui/react-tooltip';
import { CheckIcon, ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { track } from '@ably/ui/core/insights';
import { useTheme } from 'src/contexts/theme-context';
import type { Theme } from 'src/utilities/theme';
import { iconButtonClassName, tooltipContentClassName } from './utils/styles';

const OPTIONS: { value: Theme; label: string; icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: ComputerDesktopIcon },
];

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent>
      <DropdownMenu.Root>
        <Tooltip.Root>
          <DropdownMenu.Trigger asChild>
            <Tooltip.Trigger asChild>
              <button
                className={iconButtonClassName}
                aria-label="Switch theme"
                onClick={() => track('docs_theme_switcher_button_clicked')}
              >
                {/* The theme class is set on <html> before paint, so CSS drives the
                    trigger icon — no client-only state and no hydration mismatch. */}
                <SunIcon className="size-[20px] dark:hidden" aria-hidden />
                <MoonIcon className="size-[20px] hidden dark:block" aria-hidden />
              </button>
            </Tooltip.Trigger>
          </DropdownMenu.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content className={tooltipContentClassName}>Theme</Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[160px] bg-neutral-000 dark:bg-neutral-1300 border border-neutral-300 dark:border-neutral-1000 rounded-lg ui-shadow-lg-medium p-1 z-50"
            sideOffset={5}
            align="end"
          >
            {OPTIONS.map(({ value, label, icon: OptionIcon }) => (
              <DropdownMenu.Item
                key={value}
                className="flex items-center justify-between gap-4 px-3 py-2 text-sm text-neutral-1300 dark:text-neutral-000 hover:bg-neutral-100 dark:hover:bg-neutral-1200 rounded cursor-pointer outline-none"
                onSelect={() => {
                  setTheme(value);
                  track('docs_theme_selected', { theme: value });
                }}
              >
                <span className="flex items-center gap-2">
                  <OptionIcon className="size-[18px]" aria-hidden />
                  {label}
                </span>
                {theme === value ? <CheckIcon className="size-[16px]" aria-hidden /> : null}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Tooltip.Provider>
  );
};

export default ThemeSwitcher;
