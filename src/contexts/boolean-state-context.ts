import { identity } from 'lodash';
import { createContext } from 'react';

export type IdentityPlaceholderFunction = <T>(t: T) => T;
export type DispatchBooleanChange = (showFooter: boolean) => void | IdentityPlaceholderFunction;

export type BooleanStateContext = {
  boolean: boolean;
  dispatchBooleanChange: DispatchBooleanChange;
};

const DEFAULT_BOOLEAN_CONTEXT: BooleanStateContext = {
  boolean: true,
  dispatchBooleanChange: identity,
};

export const createBooleanStateContext = () => createContext(DEFAULT_BOOLEAN_CONTEXT);
