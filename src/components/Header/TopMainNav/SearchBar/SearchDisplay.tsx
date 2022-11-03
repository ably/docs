import React, { EventHandler, SyntheticEvent, ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

export enum DisplayMode {
  FULL_SCREEN = 'FULL_SCREEN',
  MOBILE = 'MOBILE',
}

export const SearchDisplay = forwardRef(
  (
    {
      displayMode = DisplayMode.FULL_SCREEN,
      onClick,
      children,
    }: {
      displayMode?: DisplayMode;
      onClick: EventHandler<SyntheticEvent<HTMLDivElement, MouseEvent>>;
      children: React.ReactNode;
    },
    ref: ForwardedRef<HTMLDivElement>,
  ) => (
    <div
      ref={ref}
      onClick={onClick}
      className={cn(
        'py-12 px-16 bg-light-grey border border-mid-grey rounded-lg hover:border-light-grey relative focus-within:bg-white focus-within:shadow-input focus-within:border-transparent focus-within:outline-gui-focus',
        {
          'md:hidden max-w-4/5 m-24 flex transition-input': displayMode === DisplayMode.MOBILE,
          'hidden md:flex mx-16 items-center justify-center': displayMode === DisplayMode.FULL_SCREEN,
        },
      )}
    >
      {children}
    </div>
  ),
);

SearchDisplay.displayName = 'SearchDisplay';
