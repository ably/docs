import React from 'react';
import cn from 'classnames';
import { base, menu, end, light } from './HorizontalMenu.module.css';

export enum HorizontalMenuVariant {
  menu = 'menu',
  light = 'light',
  end = 'end',
}

interface Props {
  children: React.ReactNode;
  variant?: HorizontalMenuVariant;
}

const HorizontalMenu = ({ children, variant = HorizontalMenuVariant.menu }: Props) => (
  <menu
    className={cn(base, {
      [menu]: variant === HorizontalMenuVariant.menu,
      [end]: variant === HorizontalMenuVariant.end,
      [light]: variant === HorizontalMenuVariant.light,
    })}
  >
    {children}
  </menu>
  // <>{children}</>
);

export default HorizontalMenu;
