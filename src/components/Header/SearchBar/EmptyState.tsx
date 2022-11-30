import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

export const EmptyState = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('p-16 mb-16 text-menu3 font-light text-charcoal-grey', className)} {...props} />;
};
