import React, { ReactNode } from 'react';
import cn from '@ably/ui/core/utils/cn';

type AdmonitionVariant = 'neutral' | 'blue' | 'green' | 'red' | 'yellow';

interface AdmonitionProps {
  variant?: AdmonitionVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const admonitionConfig: Record<
  AdmonitionVariant,
  {
    borderColor: string;
    backgroundColor: string;
  }
> = {
  neutral: {
    borderColor: 'border-l-neutral-500 dark:border-l-neutral-800',
    backgroundColor: 'bg-neutral-100 dark:bg-neutral-1200',
  },
  blue: {
    borderColor: 'border-l-blue-500 dark:border-l-blue-400',
    backgroundColor: 'bg-blue-100 dark:bg-blue-800',
  },
  green: {
    borderColor: 'border-l-green-500 dark:border-l-green-400',
    backgroundColor: 'bg-green-100 dark:bg-green-800',
  },
  red: {
    borderColor: 'border-l-orange-500 dark:border-l-orange-600',
    backgroundColor: 'bg-orange-100 dark:bg-orange-1000',
  },
  yellow: {
    borderColor: 'border-l-yellow-500 dark:border-l-yellow-400',
    backgroundColor: 'bg-yellow-100 dark:bg-yellow-800',
  },
};

const Admonition: React.FC<AdmonitionProps> = ({ variant = 'blue', title, children, className }) => {
  const { borderColor, backgroundColor } = admonitionConfig[variant] ?? {};

  return (
    <aside
      className={cn(
        'border-l px-6 py-4 my-4 rounded-r-lg text-neutral-1000 dark:text-neutral-300',
        borderColor,
        backgroundColor,
        className,
      )}
    >
      <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_p]:inline [&_p]:m-0">
        {title && <strong className="font-bold ui-text-p2">{title}: </strong>}
        {children}
      </div>
    </aside>
  );
};

export default Admonition;
