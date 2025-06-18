import React, { HTMLAttributes } from 'react';
import cn from '@ably/ui/core/utils/cn';

export const EmptyState = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('p-4 mb-4 ui-text-label3', className)} {...props} />;
};
