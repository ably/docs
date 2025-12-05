import { CSSProperties, forwardRef } from 'react';

export type InkeepInstanceType = 'search' | 'chat';

export const InkeepSearchBar = forwardRef<
  HTMLDivElement,
  { className?: string; extraInputStyle?: CSSProperties; instanceType?: InkeepInstanceType }
>(({ className, extraInputStyle = {}, instanceType = 'search' }, ref) => {
  const id = instanceType === 'chat' ? 'inkeep-ai-chat' : 'inkeep-search';
  return <div ref={ref} id={id} className={className} style={extraInputStyle}></div>;
});

InkeepSearchBar.displayName = 'InkeepSearchBar';
