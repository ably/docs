import React from 'react';
import cn from 'classnames';
import { Container } from 'src/components';
import { end, light } from './HorizontalMenu.module.css';

export enum HorizontalMenuVariant {
  light = 'light',
  end = 'end',
}

interface Props {
  children: React.ReactNode;
  variant?: HorizontalMenuVariant;
  className?: string;
}

const HorizontalMenu = ({ children, variant = HorizontalMenuVariant.light, className = '' }: Props) => (
  <Container
    as="menu"
    role="menu"
    className={cn(
      {
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
