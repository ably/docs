import React, { EventHandler, SyntheticEvent } from 'react';

export const FullSizeSearchDisplay = ({
  onClick,
  children,
}: {
  onClick: EventHandler<SyntheticEvent<HTMLDivElement, MouseEvent>>;
  children: React.ReactNode;
}) => (
  <div
    onClick={onClick}
    className="hidden sm:flex h-48 px-16 mx-16 bg-light-grey border border-mid-grey rounded-md flex-row flex-shrink justify-self-start self-center"
  >
    {children}
  </div>
);
