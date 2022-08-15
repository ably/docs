import React, { EventHandler, SyntheticEvent } from 'react';

export const MobileSearchDisplay = ({
  onClick,
  children,
}: {
  onClick: EventHandler<SyntheticEvent<HTMLDivElement, MouseEvent>>;
  children: React.ReactNode;
}) => (
  <div
    onClick={onClick}
    className="md:hidden h-48 px-16 m-24 bg-light-grey border border-mid-grey rounded-md flex flex-row justify-self-start self-center"
  >
    {children}
  </div>
);
