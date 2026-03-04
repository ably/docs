import React from 'react';
import cn from '@ably/ui/core/utils/cn';

interface NestedTableExpandButtonProps {
  typeName: string;
  expanded: boolean;
  onClick: () => void;
}

export const NestedTableExpandButton: React.FC<NestedTableExpandButtonProps> = ({ typeName, expanded, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      className={cn(
        'text-sm font-medium transition-colors',
        'flex items-center gap-1.5',
        expanded
          ? // Expanded: full-width bar with bottom border, grey only on hover (28px height per Figma)
            'w-full px-3 sm:px-5 py-1 text-neutral-900 dark:text-neutral-400 border-b border-neutral-400 dark:border-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-1100'
          : // Collapsed: compact bordered pill button
            'mt-3 px-3 py-1.5 rounded-lg border border-neutral-400 dark:border-neutral-900 text-neutral-800 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-1100',
      )}
    >
      <span className="text-base leading-none font-normal">{expanded ? '—' : '+'}</span>
      <span>
        {expanded ? 'Hide' : 'Show'} {typeName}
      </span>
    </button>
  );
};
