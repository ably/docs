import React from 'react';
import { SidebarData } from 'src/components';
import { HamburgerExpandedMenuContext } from './hamburger-expanded-menu-context';
import { HamburgerSidebarLinkItem } from '.';
import { HamburgerSidebarSubmenu } from '.';

export const HamburgerSidebarItem = (props: SidebarData) => {
  const hasContent = !!props.content;
  const isBaseLevel = props.level === 0 || !props.level;
  const isOpen = !props.closed;
  const isBold = hasContent && (isBaseLevel || isOpen);
  const className = isBold ? 'font-medium ' : 'font-light';
  return (
    <HamburgerExpandedMenuContext.Consumer>
      {({ expandedMenu, handleMenuExpansion }) => (
        <li className={className}>
          {props.content ? (
            <HamburgerSidebarSubmenu
              handleMenuExpansion={handleMenuExpansion}
              label={props.label}
              level={props.level}
              nestedLevel={expandedMenu.length}
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
