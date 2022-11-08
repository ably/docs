import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import cn from 'classnames';

import { sidebar } from './SidebarHeading.module.css';
import { ROOT_LEVEL } from './consts';

export type SidebarHeadingProps<C extends ElementType> = {
  as?: C;
  indent?: number;
  isActive?: boolean;
  href?: string;
  level?: number;
};

type Props<C extends ElementType> = PropsWithChildren<SidebarHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof SidebarHeadingProps<C>>;

export const SidebarHeading = <C extends ElementType>({
  as,
  indent = 0,
  isActive = false,
  className = '',
  href,
  level = ROOT_LEVEL,
  ...props
}: Props<C>) => {
  const Component = as || 'span';
  const scrollLinkIntoView = (node: HTMLElement) => {
    if (node && (window.location.pathname === props.to || window.location.pathname === href)) {
      node.scrollIntoView();
    }
  };

  return (
    <Component
      {...props}
      ref={scrollLinkIntoView}
      href={href}
      className={cn(
        sidebar,
        {
          'font-light text-cool-black': !isActive && !href,
          'font-medium text-active-orange': isActive,
        },
        `ml-${indent}`,
        className,
      )}
    />
  );
};
