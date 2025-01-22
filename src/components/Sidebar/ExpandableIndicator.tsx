import React from 'react';
import Icon from '@ably/ui/core/Icon';
import cn from '@ably/ui/core/utils/cn';

import { expendableIndicator, isExpanded } from './ExpandableIndicator.module.css';

export const ExpandableIndicator = ({
  expanded = false,
  className = '',
}: {
  expanded?: boolean;
  className?: string;
}) => (
  <Icon
    name="icon-gui-chevron-right-micro"
    size="1rem"
    additionalCSS={cn(
      expendableIndicator,
      {
        [isExpanded]: expanded,
      },
      className,
    )}
  />
);
