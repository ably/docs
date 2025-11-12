import { CSSProperties, forwardRef } from 'react';

export const InkeepSearchBar = forwardRef<HTMLDivElement, { className?: string; extraInputStyle?: CSSProperties }>(
  ({ className, extraInputStyle = {} }, ref) => {
    return <div ref={ref} id="inkeep-search" className={className} style={extraInputStyle}></div>;
  },
);

InkeepSearchBar.displayName = 'InkeepSearchBar';
