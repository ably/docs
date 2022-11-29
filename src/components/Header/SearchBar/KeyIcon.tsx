import React, { HTMLAttributes } from 'react';
import cn from 'classnames';

import { keyIcon } from './KeyIcon.module.css';

export const KeyIcon = ({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} className={cn(keyIcon, className)} />;
};
