import { DropdownDataIdentifier } from './Dropdown';

export type MouseoverAction = { type: 'mouse-over'; dropdownId: DropdownDataIdentifier };
export type MouseoutAction = { type: 'mouse-out'; dropdownId: DropdownDataIdentifier };
export type ActivateAction = { type: 'activate'; dropdownId: DropdownDataIdentifier };
export type DeactivateAllAction = { type: 'deactivateAll' };

export type TopMainNavAction = MouseoverAction | MouseoutAction | ActivateAction | DeactivateAllAction;

export type TopMainNavState = {
  [key in DropdownDataIdentifier]: { isOpen: boolean; isSelected: boolean };
};

export const initialState: TopMainNavState = {
  'API References': { isOpen: false, isSelected: false },
  Resources: { isOpen: false, isSelected: false },
  'Your Account': { isOpen: false, isSelected: false },
};

type TopMainNavReducer = (state: TopMainNavState, action: TopMainNavAction) => TopMainNavState;

export const mainNavReducer: TopMainNavReducer = (state, action) => {
  switch (action.type) {
    case 'mouse-over': {
      const stateEntries = Object.entries(state);
      const entryIsSelected = stateEntries.find((item) => item[1].isSelected === true) !== undefined;
      if (entryIsSelected) {
        return state;
      }
      const newStateEntries = stateEntries.map(([key, stateEntry]) => [
        key,
        { ...stateEntry, isOpen: key === action.dropdownId },
      ]);
      return Object.fromEntries(newStateEntries) as TopMainNavState;
    }
    case 'mouse-out': {
      const currentIsSelected = state[action.dropdownId].isSelected;
      return {
        ...state,
        [action.dropdownId]: {
          isOpen: currentIsSelected,
          isSelected: currentIsSelected,
        },
      };
    }
    case 'activate': {
      const newIsSelected = !state[action.dropdownId].isSelected;
      return {
        ...initialState,
        [action.dropdownId]: { isOpen: newIsSelected, isSelected: newIsSelected },
      };
    }
    case 'deactivateAll': {
      return initialState;
    }
    default:
      throw new Error();
  }
};
