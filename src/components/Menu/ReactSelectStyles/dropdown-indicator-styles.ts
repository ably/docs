import { DropdownIndicatorProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';

export const dropdownIndicatorStyles: StylesConfigFunction<
  DropdownIndicatorProps<ReactSelectOption, false, ReactSelectOptGroup>
> = (provided) => ({
  ...provided,
  padding: '4px',
  color: 'var(--color-cool-black)',
  '&:hover': {
    color: 'var(--color-gui-hover)',
  },
});

export const dropdownIndicatorDisabledStyles: StylesConfigFunction<
  DropdownIndicatorProps<ReactSelectOption, false, ReactSelectOptGroup>
> = (provided) => ({
  ...provided,
  padding: '4px',
  color: 'var(--color-mid-grey)',
});
