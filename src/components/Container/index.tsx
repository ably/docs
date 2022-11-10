import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import cn from 'classnames';

import { articleStyles, navStyles } from './Container.module.css';

export enum ContainerVariant {
  article = 'article',
  nav = 'nav',
}

type ContainerHeadingProps<C extends ElementType> = {
  as?: C;
  variant?: ContainerVariant;
};

type Props<C extends ElementType> = PropsWithChildren<ContainerHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ContainerHeadingProps<C>>;

export const Container = <C extends ElementType>({
  as,
  className,
  variant = ContainerVariant.nav,
  ...props
}: Props<C>) => {
  const Component = as || 'div';
  return (
    <Component
      {...props}
      className={cn(className, {
        [articleStyles]: variant === ContainerVariant.article,
        [navStyles]: variant === ContainerVariant.nav,
      })}
    />
  );
};
