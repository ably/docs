import React from 'react';
import cn from 'classnames';
import { end, light, scrollX } from './HorizontalMenu.module.css';

export enum HorizontalMenuVariant {
  menu = 'menu',
  light = 'light',
  end = 'end',
  scrollX = 'scrollX',
}

interface Props {
  children: React.ReactNode;
  variant?: HorizontalMenuVariant;
  className?: string;
}

const HorizontalMenu = ({ children, variant = HorizontalMenuVariant.menu, className = '' }: Props) => (
  <menu
    role="menu"
    className={cn(
      'flex overflow-visible   m-0',
      {
        'border-b border-charcoal-grey relative p-0': variant === HorizontalMenuVariant.menu,
        [end]: variant === HorizontalMenuVariant.end,
        [light]: variant === HorizontalMenuVariant.light,
        [scrollX]: variant === HorizontalMenuVariant.scrollX,
      },
      className,
    )}
  >
    {children}
  </menu>
);

export default HorizontalMenu;
