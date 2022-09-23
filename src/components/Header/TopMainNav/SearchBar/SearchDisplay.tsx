import React, { EventHandler, SyntheticEvent } from 'react';
import cn from 'classnames';

export enum DisplayMode {
  FULL_SCREEN = 'FULL_SCREEN',
  MOBILE = 'MOBILE',
}

export const SearchDisplay = ({
  displayMode = DisplayMode.FULL_SCREEN,
  onClick,
  children,
}: {
  displayMode?: DisplayMode;
  onClick: EventHandler<SyntheticEvent<HTMLDivElement, MouseEvent>>;
  children: React.ReactNode;
}) => (
  <div
    onClick={onClick}
    className={cn(
      'h-48, px-16  bg-light-grey border border-mid-grey rounded-md flex-row justify-self-start self-center hover:bg-white hover:border-light-grey relative focus-within:bg-white focus-within:shadow-input focus-within:border-transparent focus-within:outline-gui-focus',
      {
        'md:hidden max-w-4/5 m-24 flex transition-input': displayMode === DisplayMode.MOBILE,
        'hidden sm:flex mx-16 flex-shrink hover:bg-white': displayMode === DisplayMode.FULL_SCREEN,
      },
    )}
  >
    {children}
  </div>
);
