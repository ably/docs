import React from 'react';
import Icon from '@ably/ui/core/Icon';
import cn from 'classnames';

import { expendableIndicator, isExpanded } from './ExpandableIndicator.module.css';

export const ExpandableIndicator = ({
  expanded = false,
  className = '',
}: {
  expanded?: boolean;
  className?: string;
}) => (
  <Icon
    name="icon-gui-disclosure-arrow"
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
