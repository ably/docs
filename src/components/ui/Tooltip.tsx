import React, { ButtonHTMLAttributes, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import Icon from 'src/components/Icon';
import cn from 'src/utilities/cn';
import { IconSize } from 'src/components/Icon/types';

type TooltipProps = {
  triggerElement?: ReactNode;
  triggerProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  contentProps?: RadixTooltip.TooltipContentProps & HTMLAttributes<HTMLDivElement>;
  rootProps?: RadixTooltip.TooltipProps;
  interactive?: boolean;
  iconSize?: IconSize;
} & HTMLAttributes<HTMLDivElement>;

const Tooltip = ({
  children,
  triggerElement,
  triggerProps,
  contentProps,
  rootProps,
  interactive = false,
  iconSize = '1rem',
  ...rest
}: PropsWithChildren<TooltipProps>) => {
  return (
    <div {...rest} className={cn('inline-flex ml-2', rest?.className)}>
      <RadixTooltip.Provider delayDuration={0}>
        <RadixTooltip.Root {...(!interactive ? { disableHoverableContent: true } : {})} {...rootProps}>
          <RadixTooltip.Trigger asChild>
            <button
              type="button"
              {...triggerProps}
              className={cn('p-0 relative focus:outline-none h-[1rem]', triggerProps?.className)}
            >
              {triggerElement ?? (
                <Icon
                  name="icon-gui-information-circle-outline"
                  color="text-neutral-700 dark:text-neutral-600 hover:text-neutral-1000 dark:hover:text-neutral-300"
                  size={iconSize}
                />
              )}
            </button>
          </RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content
              sideOffset={8}
              {...contentProps}
              className={cn(
                'bg-neutral-300 dark:bg-neutral-1000 text-neutral-1100 dark:text-neutral-200 ui-text-p3 font-medium p-4',
                { 'pointer-events-auto': interactive },
                'rounded-lg shadow-[4px_4px_15px_rgba(0,0,0,0.2)] z-[1000]',
                'data-[state=closed]:animate-[tooltipExit_0.25s_ease-in-out]',
                'data-[state=delayed-open]:animate-[tooltipEntry_0.25s_ease-in-out]',
                contentProps?.className,
              )}
            >
              <div className="max-w-60 w-auto">{children}</div>
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    </div>
  );
};

export default Tooltip;
