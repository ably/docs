import React, { PropsWithChildren, useMemo } from 'react';
import { IconName, IconSize } from 'src/components/Icon/types';
import Icon from 'src/components/Icon';
import cn from 'src/utilities/cn';
import { ColorClassColorGroups } from './colors';

/**
 * Props for the Badge component.
 */
export interface BadgeProps {
  /**
   * The size of the badge. Can be one of "xs", "sm", "md", or "lg".
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * The color of the badge. Can be a value from ColorClassColorGroups or "red".
   */
  color?: ColorClassColorGroups | 'red';

  /**
   * The name of the icon to be displayed before the children in the badge.
   */
  iconBefore?: IconName;

  /**
   * The name of the icon to be displayed after the children in the badge.
   */
  iconAfter?: IconName;

  /**
   * Additional CSS class names to apply to the badge.
   */
  className?: string;

  /**
   * Whether the badge is disabled. Defaults to false.
   */
  disabled?: boolean;

  /**
   * Whether the badge is focusable. Defaults to false.
   */
  focusable?: boolean;

  /**
   * Whether the badge is hoverable. Defaults to false.
   */
  hoverable?: boolean;

  /**
   * The size of the icons in the badge. If not provided, it will be derived from the badge size.
   */
  iconSize?: IconSize;

  /**
   * Accessible label for the badge when interactive
   */
  ariaLabel?: string;

  /**
   * Additional CSS class names to apply to the children of the badge.
   */
  childClassName?: string;
}

const defaultIconSizeByBadgeSize: Record<NonNullable<BadgeProps['size']>, IconSize> = {
  lg: '16px',
  md: '15px',
  sm: '14px',
  xs: '13px',
};

const Badge: React.FC<PropsWithChildren<BadgeProps>> = ({
  size = 'md',
  color = 'neutral',
  iconBefore,
  iconAfter,
  className,
  childClassName,
  children,
  disabled = false,
  focusable = false,
  hoverable = false,
  iconSize,
  ariaLabel,
}) => {
  const sizeClass = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'px-2 py-0 text-[10px] leading-tight';
      case 'sm':
        return 'px-2 py-0.5 text-[10px] leading-tight';
      case 'md':
        return 'px-2.5 py-0.5 text-[11px] leading-normal';
      case 'lg':
        return 'px-3 py-[0.1875rem] text-[12px] leading-normal';
    }
  }, [size]);

  const childClass = useMemo(() => {
    switch (size) {
      case 'xs':
      case 'sm':
        return 'leading-[18px]';
      case 'md':
      case 'lg':
        return 'leading-[20px]';
    }
  }, [size]);

  const colorClass = useMemo(() => {
    switch (color) {
      case 'neutral':
        return 'text-neutral-900 dark:text-neutral-400';
      case 'violet':
        return 'text-violet-400';
      case 'orange':
        return 'text-orange-600';
      case 'yellow':
        return 'text-yellow-600';
      case 'green':
        return 'text-green-600';
      case 'blue':
        return 'text-blue-600';
      case 'pink':
        return 'text-pink-600';
      case 'red':
        return 'text-orange-700';
    }
  }, [color]);

  const computedIconSize = iconSize ?? defaultIconSizeByBadgeSize[size];

  return (
    <div
      className={cn(
        'inline-flex bg-neutral-100 dark:bg-neutral-1200 rounded-2xl gap-1 items-center focus-base transition-colors select-none font-semibold',
        sizeClass,
        colorClass,
        { 'focus-base': focusable },
        {
          'hover:bg-neutral-300 hover:dark:bg-neutral-1000 active:bg-neutral-300 dark:active:bg-neutral-1000':
            hoverable,
        },
        {
          'cursor-not-allowed disabled:text-gui-disabled-light dark:disabled:text-gui-disabled-dark': disabled,
        },
        className,
      )}
      tabIndex={focusable ? 0 : undefined}
      role={focusable ? 'button' : undefined}
      aria-label={focusable || hoverable ? ariaLabel : undefined}
    >
      {iconBefore ? <Icon name={iconBefore} size={computedIconSize} color={colorClass} /> : null}

      <span className={cn('whitespace-nowrap tracking-[0.04em]', childClass, childClassName)}>{children}</span>

      {iconAfter ? <Icon name={iconAfter} size={computedIconSize} color={colorClass} /> : null}
    </div>
  );
};

export default Badge;
