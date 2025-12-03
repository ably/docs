import React from 'react';
import cn from '@ably/ui/core/utils/cn';

type AdmonitionVariant =
  | 'neutral'
  | 'note'
  | 'further-reading'
  | 'important'
  | 'new'
  | 'warning'
  | 'experimental'
  | 'updated';

interface AdmonitionProps extends React.HTMLAttributes<HTMLElement> {
  'data-type'?: AdmonitionVariant;
}

const admonitionConfig: Record<
  AdmonitionVariant,
  {
    borderColor: string;
    backgroundColor: string;
    title: string;
  }
> = {
  neutral: {
    borderColor: 'border-l-neutral-500 dark:border-l-neutral-800',
    backgroundColor: 'bg-neutral-100 dark:bg-neutral-1200',
    title: 'Category',
  },
  note: {
    borderColor: 'border-l-blue-500 dark:border-l-blue-400',
    backgroundColor: 'bg-blue-100 dark:bg-blue-800',
    title: 'Note',
  },
  'further-reading': {
    borderColor: 'border-l-green-500 dark:border-l-green-400',
    backgroundColor: 'bg-green-100 dark:bg-green-800',
    title: 'Further reading',
  },
  important: {
    borderColor: 'border-l-orange-500 dark:border-l-orange-600',
    backgroundColor: 'bg-orange-100 dark:bg-orange-1000',
    title: 'Important',
  },
  new: {
    borderColor: 'border-l-yellow-500 dark:border-l-yellow-400',
    backgroundColor: 'bg-yellow-100 dark:bg-yellow-800',
    title: 'New',
  },
  warning: {
    borderColor: 'border-l-yellow-500 dark:border-l-yellow-400',
    backgroundColor: 'bg-yellow-100 dark:bg-yellow-800',
    title: 'Warning',
  },
  experimental: {
    borderColor: 'border-l-purple-500 dark:border-l-purple-400',
    backgroundColor: 'bg-purple-100 dark:bg-purple-800',
    title: 'Experimental',
  },
  updated: {
    borderColor: 'border-l-pink-500 dark:border-l-pink-400',
    backgroundColor: 'bg-pink-100 dark:bg-pink-800',
    title: 'Updated',
  },
};

const Admonition: React.FC<AdmonitionProps> = ({ 'data-type': dataType = 'note', children, className, ...rest }) => {
  const { borderColor, backgroundColor, title } = admonitionConfig[dataType] ?? admonitionConfig.note;

  return (
    <aside
      {...rest}
      data-type={dataType}
      className={cn(
        'border-l px-6 py-4 my-4 rounded-r-lg text-neutral-1000 dark:text-neutral-300',
        borderColor,
        backgroundColor,
        className,
      )}
    >
      <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>*:nth-child(2)]:inline [&>*:nth-child(3)]:mt-5">
        <strong className="font-bold ui-text-p2">{title}: </strong>
        {children}
      </div>
    </aside>
  );
};

export default Admonition;
