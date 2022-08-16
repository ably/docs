import { identity } from 'lodash';
import { createContext } from 'react';

export type IdentityPlaceholderFunction = <T>(t: T) => T;
export type ExpandedMenu = string[];
export type DispatchExpandedMenu = (menuItemID: string) => void | IdentityPlaceholderFunction;

export type ExpandedMenuContext = {
  expandedMenu: ExpandedMenu;
  handleMenuExpansion: DispatchExpandedMenu;
};

const DEFAULT_EXPANDED_MENU_CONTEXT: ExpandedMenuContext = {
  expandedMenu: [],
  handleMenuExpansion: identity,
};

export const HamburgerExpandedMenuContext = createContext(DEFAULT_EXPANDED_MENU_CONTEXT);
