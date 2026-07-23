import React, { useMemo } from 'react';
import Tooltip from 'src/components/ui/Tooltip';
import SegmentedControl, { SegmentedControlSize } from 'src/components/ui/SegmentedControl';
import cn from 'src/utilities/cn';
import Icon from 'src/components/Icon';
import { IconName } from 'src/components/Icon/types';
import type { TooltipProps } from '@radix-ui/react-tooltip';

type TooltipButtonProps = {
  tooltip: string | React.ReactNode;
  active?: boolean;
  onClick: () => void;
  icon?: IconName;
  className?: string;
  children?: React.ReactNode;
  variant?: 'segmented' | 'icon-button';
  size?: SegmentedControlSize;
  alwaysShowLabel?: boolean;
  tooltipRootProps?: TooltipProps;
};

const TooltipButton = ({
  tooltip,
  active = false,
  onClick,
  icon,
  className,
  children,
  variant = 'segmented',
  size = 'sm',
  alwaysShowLabel = false,
  tooltipRootProps,
}: TooltipButtonProps) => {
  const showTooltip = (variant === 'segmented' && !active) || variant === 'icon-button';

  const showChildren = active || alwaysShowLabel;

  const buttonElement = useMemo(() => {
    if (variant === 'segmented') {
      return (
        <SegmentedControl
          size={size}
          active={active}
          onClick={onClick}
          leftIcon={icon ? <Icon name={icon} /> : undefined}
          className={cn(
            'focus-base transition-colors',
            active
              ? 'bg-neutral-000 dark:bg-neutral-1100'
              : 'bg-neutral-100 dark:bg-neutral-1200 hover:bg-neutral-200 dark:hover:bg-neutral-1100 active:bg-neutral-400 dark:active:bg-neutral-900',
            className,
          )}
        >
          {showChildren ? children : null}
        </SegmentedControl>
      );
    }

    return (
      <div
        role="button"
        className={cn(
          'w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-200 dark:bg-neutral-1100 hover:bg-neutral-300 dark:hover:bg-neutral-1000 transition-colors focus-base',
          className,
        )}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        tabIndex={0}
      >
        {children}
      </div>
    );
  }, [variant, size, active, onClick, icon, className, showChildren, children]);

  if (showTooltip) {
    return (
      <Tooltip
        triggerElement={buttonElement}
        rootProps={tooltipRootProps}
        className="ml-0"
        contentProps={{
          className: 'px-2 py-1 bg-neutral-1100 dark:bg-neutral-200 text-neutral-300 dark:text-neutral-1000',
        }}
        triggerProps={{ className: 'ml-0 h-auto' }}
      >
        {tooltip}
      </Tooltip>
    );
  }

  return buttonElement;
};

export default TooltipButton;
