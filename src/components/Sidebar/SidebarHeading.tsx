import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import cn from 'classnames';

import { container } from './SidebarHeading.module.css';

export type SidebarHeadingProps<C extends ElementType> = {
  as?: C;
  isLeaf?: boolean;
  indent?: number;
  isActive?: boolean;
};

type Props<C extends ElementType> = PropsWithChildren<SidebarHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof SidebarHeadingProps<C>>;

const SidebarHeading = <C extends ElementType>({ as, isLeaf, indent, isActive, className, ...props }: Props<C>) => {
  const Component = as || 'span';

  return (
    <Component
      {...props}
      className={cn(
        container,
        {
          'font-normal': !isLeaf,
          'font-bold': isLeaf,
          'text-active-orange': isActive,
        },
        className,
      )}
      styles={{ maringLeft: `${indent ?? 0}px` }}
    />
  );
};

export default SidebarHeading;
