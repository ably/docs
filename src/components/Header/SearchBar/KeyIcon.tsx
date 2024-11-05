import React, { HTMLAttributes } from 'react';
import cn from '@ably/ui/core/utils/cn';

import { keyIcon } from './KeyIcon.module.css';

export const KeyIcon = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={cn(keyIcon, className)} />;
};
