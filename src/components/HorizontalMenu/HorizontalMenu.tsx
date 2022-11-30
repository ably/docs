import React from 'react';
import cn from 'classnames';
import { Container } from 'src/components';
import { end, light, menu } from './HorizontalMenu.module.css';

export enum HorizontalMenuVariant {
  menu = 'menu',
  light = 'light',
  end = 'end',
}

interface Props {
  children: React.ReactNode;
  variant?: HorizontalMenuVariant;
  className?: string;
}

const HorizontalMenu = ({ children, variant = HorizontalMenuVariant.menu, className = '' }: Props) => (
  <Container
    as="menu"
    role="menu"
    className={cn(
      'flex overflow-visible m-0 pl-0',
      {
        [menu]: variant === HorizontalMenuVariant.menu,
        [end]: variant === HorizontalMenuVariant.end,
        [light]: variant === HorizontalMenuVariant.light,
      },
      className,
    )}
  >
    {children}
  </Container>
);

export default HorizontalMenu;
