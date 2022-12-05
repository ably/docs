import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

type ContainerHeadingProps<C extends ElementType> = {
  as?: C;
};

type Props<C extends ElementType> = PropsWithChildren<ContainerHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ContainerHeadingProps<C>>;

export const Container = <C extends ElementType>({ as, className, ...props }: Props<C>) => {
  const Component = as || 'div';
  return <Component {...props} className={className} />;
};
