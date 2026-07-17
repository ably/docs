import React, { useEffect, useState } from 'react';
import { ComputerDesktopIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { track } from '@ably/ui/core/insights';
import cn from 'src/utilities/cn';
import { useTheme } from 'src/contexts/theme-context';
import { DEFAULT_THEME, type Theme } from 'src/utilities/theme';

const OPTIONS: { value: Theme; label: string; icon: typeof SunIcon }[] = [
  { value: 'system', label: 'System theme', icon: ComputerDesktopIcon },
  { value: 'dark', label: 'Dark theme', icon: MoonIcon },
  { value: 'light', label: 'Light theme', icon: SunIcon },
];

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  // `theme` comes from localStorage (client-only), so match the server's default
  // until mounted to avoid a hydration mismatch on which cell is highlighted.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const selected = mounted ? theme : DEFAULT_THEME;

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex items-center gap-0.5 p-0.5 rounded-lg border border-neutral-300 dark:border-neutral-1100"
    >
      {OPTIONS.map(({ value, label, icon: OptionIcon }) => {
        const isActive = selected === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            onClick={() => {
              setTheme(value);
              track('docs_theme_selected', { theme: value });
            }}
            className={cn(
              'focus-base flex items-center justify-center size-8 rounded-md transition-colors',
              isActive
                ? 'bg-neutral-100 dark:bg-neutral-1100 text-neutral-1300 dark:text-neutral-000'
                : 'text-neutral-800 dark:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-1200 hover:text-neutral-1300 dark:hover:text-neutral-000',
            )}
          >
            <OptionIcon className="size-[18px]" aria-hidden />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
