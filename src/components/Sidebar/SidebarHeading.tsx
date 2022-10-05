import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import cn from 'classnames';

import { sidebar } from './SidebarHeading.module.css';

export type SidebarHeadingProps<C extends ElementType> = {
  as?: C;
  indent?: number;
  isExpanded?: boolean;
  isActive?: boolean;
};

type Props<C extends ElementType> = PropsWithChildren<SidebarHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof SidebarHeadingProps<C>>;

const SidebarHeading = <C extends ElementType>({
  as,
  indent = 0,
  isExpanded = false,
  isActive = false,
  className,
  ...props
}: Props<C>) => {
  const Component = as || 'span';

  return (
    <Component
      {...props}
      style={{ marginLeft: `${indent <= 8 ? 0 : indent - 8}px` }}
      className={cn(
        sidebar,
        {
          'font-light text-cool-black': !isActive,
          'font-medium': isActive || isExpanded,
          'text-active-orange': isActive,
        },
        className,
      )}
    />
  );
};

export default SidebarHeading;
