import { mapValues } from 'lodash/fp';
import { DropdownDataIdentifier } from './Dropdown';
import { initialState, mainNavReducer, TopMainNavState } from './main-nav-reducer';

const makeState = (dropdownID: DropdownDataIdentifier, isOpen: boolean, isSelected: boolean) => ({
  ...initialState,
  [dropdownID]: { isOpen, isSelected },
});

const setValuesToTrue = mapValues(() => ({ isOpen: true, isSelected: true }));

const APIReferencesStateIsOpen = makeState('API References', true, false);

const allStateValuesTrue = setValuesToTrue(initialState) as TopMainNavState;

describe('Main Nav Reducer tests', () => {
  it('Updates an initial isOpen state on mouseover', () => {
    expect(mainNavReducer(initialState, { type: 'mouse-over', dropdownId: 'API References' })).toEqual(
      APIReferencesStateIsOpen,
    );
  });
  const APIReferencesStateIsSelected = makeState('API References', true, true);
  it('Updates an initial isSelected state on activation', () => {
    expect(mainNavReducer(initialState, { type: 'activate', dropdownId: 'API References' })).toEqual(
      APIReferencesStateIsSelected,
    );
  });
  it('Ensures an existing isOpen state is false on mouse-out if isSelected is not set', () => {
    expect(mainNavReducer(initialState, { type: 'mouse-out', dropdownId: 'API References' })).toEqual(initialState);
    expect(mainNavReducer(APIReferencesStateIsOpen, { type: 'mouse-out', dropdownId: 'API References' })).toEqual(
      initialState,
    );
  });
  it('Does not change the isOpen state on mouse-out if isSelected is true', () => {
    expect(mainNavReducer(APIReferencesStateIsSelected, { type: 'mouse-out', dropdownId: 'API References' })).toEqual(
      APIReferencesStateIsSelected,
    );
  });

  it('Does not change the isOpen state on mouse-over if isSelected is true on a different item', () => {
    expect(mainNavReducer(APIReferencesStateIsSelected, { type: 'mouse-over', dropdownId: 'Resources' })).toEqual(
      APIReferencesStateIsSelected,
    );
  });

  it('Restores the initial state if deactivateAll is fired', () => {
    expect(mainNavReducer(allStateValuesTrue, { type: 'deactivateAll' })).toEqual(initialState);
  });

  it('Throws an error if the action is not valid', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const errorThrowingInvocation = () => mainNavReducer(initialState, { type: 'invalidAction' });
    expect(errorThrowingInvocation).toThrow();
  });
});
