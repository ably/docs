import * as React from 'react';
import cn from '@ably/ui/core/utils/cn';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border border-neutral-400 dark:border-neutral-900 bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none',
        'text-neutral-1300 dark:text-neutral-000 placeholder:text-neutral-600 dark:placeholder:text-neutral-700',
        'focus-visible:border-orange-600 focus-visible:ring-[3px] focus-visible:ring-orange-600/20',
        'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
