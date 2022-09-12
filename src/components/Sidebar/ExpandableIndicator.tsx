import React from 'react';
import AIChevronDown from '../../styles/svg/ai-chevron-down';
import AIChevronUp from '../../styles/svg/ai-chevron-up';

export const ExpandableIndicator = ({ expanded = false, className = '' }: { expanded?: boolean; className?: string }) =>
  expanded ? (
    <AIChevronUp className={`flex-shrink-0 stroke-0 ${className}`} />
  ) : (
    <AIChevronDown className={`flex-shrink-0 ${className}`} />
  );
