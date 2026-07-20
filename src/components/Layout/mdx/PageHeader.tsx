import React from 'react';
import cn from 'src/utilities/cn';

type PageHeaderProps = {
  title: string;
  intro: string;
  subtitle?: React.ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, intro, subtitle }) => {
  return (
    <div className="my-8 border-b border-neutral-300 dark:border-neutral-1100 pb-8">
      <h1 className={cn('ui-text-h1', intro || subtitle ? 'mb-4' : 'mb-0')}>{title}</h1>
      {subtitle && <div className={cn(intro ? 'mb-4' : 'mb-0')}>{subtitle}</div>}
      {intro && (
        <p className="text-neutral-800 dark:text-neutral-500 font-serif italic tracking-tight text-lg leading-normal mb-0">
          {intro}
        </p>
      )}
    </div>
  );
};
