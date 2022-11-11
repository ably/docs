import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import cn from 'classnames';

import { navStyles } from './Container.module.css';

type ContainerHeadingProps<C extends ElementType> = {
  as?: C;
};

type Props<C extends ElementType> = PropsWithChildren<ContainerHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ContainerHeadingProps<C>>;

export const Container = <C extends ElementType>({ as, className, ...props }: Props<C>) => {
  const Component = as || 'div';
  return <Component {...props} className={cn(className, navStyles)} />;
};
