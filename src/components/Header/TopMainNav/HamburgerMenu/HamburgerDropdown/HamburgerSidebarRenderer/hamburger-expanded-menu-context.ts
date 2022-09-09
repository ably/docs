import { identity } from 'lodash';
import { createContext } from 'react';
import { IdentityPlaceholderFunction } from '../../../../../../contexts/boolean-state-context';

export type ExpandedMenu = string[];
export type DispatchExpandedMenu = (menuItemID: string) => void | IdentityPlaceholderFunction;

export type ExpandedMenuStateContext = {
  expandedMenu: ExpandedMenu;
  handleMenuExpansion: DispatchExpandedMenu;
};

const DEFAULT_EXPANDED_MENU_CONTEXT: ExpandedMenuStateContext = {
  expandedMenu: [],
  handleMenuExpansion: identity,
};

export const HamburgerExpandedMenuContext = createContext(DEFAULT_EXPANDED_MENU_CONTEXT);
