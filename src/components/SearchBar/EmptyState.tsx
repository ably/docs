import React, { HTMLAttributes } from 'react';
import cn from '@ably/ui/core/utils/cn';

export const EmptyState = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('p-16 mb-16 ui-text-menu3', className)} {...props} />;
};
