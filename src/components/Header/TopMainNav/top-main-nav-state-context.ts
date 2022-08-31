import { createContext } from 'react';
import { initialState, TopMainNavAction } from './main-nav-reducer';

const identityTopMainNavDispatcher: React.Dispatch<TopMainNavAction> = (value) => value;

export const TopMainNavStateContext = createContext({
  topMainNavState: initialState,
  dispatch: identityTopMainNavDispatcher,
});
