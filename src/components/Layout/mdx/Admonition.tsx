import React from 'react';
import cn from '@ably/ui/core/utils/cn';
import Aside from '../../blocks/dividers/Aside';

const LEGACY_ADMONITION_TYPES = ['new', 'updated', 'experimental', 'public-preview'];

type AdmonitionVariant = 'neutral' | 'note' | 'further-reading' | 'important' | 'warning';

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
    borderColor: 'border-l-yellow-500 dark:border-l-yellow-500',
    backgroundColor: 'bg-yellow-100 dark:bg-yellow-900',
    title: 'Important',
  },
  // Unused for now, but available for another type if needed in future.
  warning: {
    borderColor: 'border-l-yellow-500 dark:border-l-yellow-400',
    backgroundColor: 'bg-yellow-100 dark:bg-yellow-800',
    title: 'Warning',
  },
};

const Admonition: React.FC<AdmonitionProps> = ({ 'data-type': dataType = 'note', children, className, ...rest }) => {
  // For 'new', 'updated', 'experimental' types, we use the older Aside component instead of the newer Admonitions component
  if (LEGACY_ADMONITION_TYPES.includes(dataType)) {
    return <Aside attribs={{ 'data-type': dataType }}>{children}</Aside>;
  }

  const { borderColor, backgroundColor, title } = admonitionConfig[dataType];

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
