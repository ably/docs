import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

export const KeyIcon = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={cn(
        'text-dark-grey hidden md:flex items-center justify-center rounded shadow-tooltip w-24 h-24 font-light pt-2',
        className,
      )}
    />
  );
};
