import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren, useCallback } from 'react';
import cn from 'classnames';

import { sidebar } from './SidebarHeading.module.css';

export type SidebarHeadingProps<C extends ElementType> = {
  as?: C;
  indent?: number;
  isExpandable?: boolean;
  isActive?: boolean;
  href?: string;
};

type Props<C extends ElementType> = PropsWithChildren<SidebarHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof SidebarHeadingProps<C>>;

export const SidebarHeading = <C extends ElementType>({
  as,
  indent = 0,
  isExpandable = false,
  isActive = false,
  className = '',
  href,
  ...props
}: Props<C>) => {
  const Component = as || 'span';
  const scrollLinkIntoView = useCallback((node) => {
    if (node && (window.location.pathname === props.to || window.location.pathname === href)) {
      node.scrollIntoView();
    }
  }, []);

  return (
    <Component
      {...props}
      ref={scrollLinkIntoView}
      href={href}
      className={cn(
        sidebar,
        {
          'font-light text-cool-black': !isActive && !href,
          'font-medium': isActive || isExpandable,
          'text-active-orange': isActive,
        },
        `ml-${indent}`,
        className,
      )}
    />
  );
};
