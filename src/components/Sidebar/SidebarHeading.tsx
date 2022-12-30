import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import cn from 'classnames';
import { safeWindow } from 'src/utilities';
import { sidebar } from './SidebarHeading.module.css';
import { isString } from 'lodash';

export type SidebarHeadingProps<C extends ElementType> = {
  as?: C;
  indent?: number;
  isActive?: boolean;
  href?: string;
};

type Props<C extends ElementType> = PropsWithChildren<SidebarHeadingProps<C>> &
  ComponentPropsWithoutRef<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof SidebarHeadingProps<C>>;

export const SidebarHeading = <C extends ElementType>({
  as,
  indent = 0,
  isActive = false,
  className = '',
  ...props
}: Props<C>) => {
  const Component = as || 'span';
  const activeClassName = 'font-medium text-active-orange';

  const link = props.to || props.href;
  const sidebarHeadingId = link ? `sidebar-heading-${link.replaceAll('#', '')}` : null;

  const scrollLinkIntoView = (node: HTMLElement) => {
    if (node && safeWindow.location.pathname === link) {
      node.scrollIntoView();
    }
  };
  const finalProps: Omit<Props<C>, 'as' | 'indent' | 'isActive' | 'className'> & {
    ref: (node: HTMLElement) => void;
    className: string;
    activeClassName?: string;
  } = {
    ...props,
    id: sidebarHeadingId,
    ref: scrollLinkIntoView,
    className: cn(sidebar, `ml-${indent} break-words`, className, {
      'font-light text-cool-black': !isActive,
      [activeClassName]: isActive,
    }),
  };
  if (!isString(Component)) {
    finalProps.activeClassName = activeClassName;
  }
  return <Component {...finalProps} />;
};
