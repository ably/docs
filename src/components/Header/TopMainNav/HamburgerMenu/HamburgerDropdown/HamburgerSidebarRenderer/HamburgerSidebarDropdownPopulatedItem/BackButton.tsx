import React from 'react';

export const BackButton = ({ onClick }: { onClick: React.MouseEventHandler }) => (
  <div
    className="cursor-pointer flex items-center max-w-full mr-24 pb-16 flex-grow justify-between text-16"
    onClick={onClick}
  >
    <span className="text-gui-default align-middle pl-24">
      <img className="pr-8 h-12" src="/images/icons/bold-chevron-left.svg" />
      Back
    </span>
  </div>
);
