import { DropdownIndicatorProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from '../react-select-option-types';

export const dropdownIndicatorStyles: StylesConfigFunction<
  DropdownIndicatorProps<ReactSelectOption, false, ReactSelectOptGroup>
> = (provided) => ({
  ...provided,
  color: 'var(--color-cool-black)',
  '&:hover': {
    color: 'var(--color-gui-hover)',
  },
});
