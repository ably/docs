import React from 'react';
import cn from '@ably/ui/core/utils/cn';

type PageHeaderProps = {
  title: string;
  intro: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, intro }) => {
  return (
    <div className="my-8 border-b border-neutral-300 dark:border-neutral-1000 pb-8">
      <h1 className={cn('ui-text-h1', intro ? 'mb-4' : 'mb-0')}>{title}</h1>
      {intro && (
        <p className="text-neutral-800 dark:text-neutral-500 font-serif italic tracking-tight text-lg leading-normal mb-0">
          {intro}
        </p>
      )}
    </div>
  );
};
