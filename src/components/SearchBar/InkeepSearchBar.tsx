import { CSSProperties } from 'react';

export const InkeepSearchBar = ({
  className,
  extraInputStyle,
}: {
  className: string;
  extraInputStyle: CSSProperties;
}) => {
  return <div id="inkeep-search" className={className} style={extraInputStyle}></div>;
};
