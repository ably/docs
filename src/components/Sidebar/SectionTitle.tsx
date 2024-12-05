import React, { HTMLAttributes } from 'react';
import cn from '@ably/ui/core/utils/cn';

import { sectionTitle } from './SectionTitle.module.css';

export const SectionTitle = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn(sectionTitle, className)} {...props} />;
};
