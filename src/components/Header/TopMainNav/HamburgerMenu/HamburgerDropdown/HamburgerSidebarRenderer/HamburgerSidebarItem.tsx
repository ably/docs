import React from 'react';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { HamburgerExpandedMenuContext } from './hamburger-expanded-menu-context';
import { HamburgerSidebarLinkItem } from './HamburgerSidebarLinkItem';
import { HamburgerSidebarSubmenu } from './HamburgerSidebarSubmenu';

export const HamburgerSidebarItem = (props: SidebarData) => {
  const className = props.content ? 'font-medium ' : 'font-light';
  return (
    <HamburgerExpandedMenuContext.Consumer>
      {({ addToExpandedMenuPath }) => (
        <li className={className}>
          {props.content ? (
            <HamburgerSidebarSubmenu
              addToExpandedMenuPath={addToExpandedMenuPath}
              label={props.label}
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
