import React from 'react';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { HamburgerExpandedMenuContext } from './hamburger-expanded-menu-context';
import { HamburgerSidebarLinkItem } from './HamburgerSidebarLinkItem';
import { HamburgerSidebarSubmenu } from './HamburgerSidebarSubmenu';

export const HamburgerSidebarItem = (props: SidebarData) => {
  const hasContent = !!props.content;
  const isBaseLevel = !props.level || props.level < 2;
  const isOpen = !props.closed;
  const isBold = hasContent && (isBaseLevel || isOpen);
  const className = isBold ? 'font-medium ' : 'font-light';
  return (
    <HamburgerExpandedMenuContext.Consumer>
      {({ handleMenuExpansion }) => (
        <li className={className}>
          {props.content ? (
            <HamburgerSidebarSubmenu
              handleMenuExpansion={handleMenuExpansion}
              label={props.label}
              level={props.level}
              closed={props.closed}
              content={props.content}
            />
          ) : (
            <HamburgerSidebarLinkItem link={props.link} label={props.label} />
          )}
        </li>
      )}
    </HamburgerExpandedMenuContext.Consumer>
  );
};
