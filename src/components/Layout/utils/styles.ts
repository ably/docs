import cn from '@ably/ui/core/utils/cn';

export const tooltipContentClassName = cn(
  'px-2 py-1 bg-neutral-1000 dark:bg-neutral-300 text-neutral-200 dark:text-neutral-1100 ui-text-p3 font-medium rounded-lg relative z-50 mt-2',
  'data-[state=closed]:animate-[tooltipExit_0.25s_ease-in-out]',
  'data-[state=delayed-open]:animate-[tooltipEntry_0.25s_ease-in-out]',
);

export const secondaryButtonClassName =
  'focus-base flex items-center justify-center gap-2 px-4 py-[7px] h-9 ui-text-label4 text-neutral-1300 dark:text-neutral-000 rounded border border-neutral-400 dark:border-neutral-900 hover:border-neutral-600 dark:hover:border-neutral-700';

export const iconButtonClassName = cn(secondaryButtonClassName, 'w-9 p-0');
