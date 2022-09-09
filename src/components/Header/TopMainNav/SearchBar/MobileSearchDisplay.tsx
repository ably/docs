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
    className="md:hidden max-w-4/5 h-48 px-16 m-24 bg-light-grey border border-mid-grey rounded-md flex flex-row justify-self-start self-center transition-input
              hover:bg-white hover:shadow-input hover:border-transparent;
              focus-within:bg-white focus-within:shadow-input focus-within:border-transparent focus-within:outline-gui-focus"
  >
    {children}
  </div>
);
