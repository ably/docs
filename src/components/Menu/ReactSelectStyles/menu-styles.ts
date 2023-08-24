import { MenuProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const menuStyles: (
  customStyles: CustomReactSelectStyles,
) => StylesConfigFunction<MenuProps<ReactSelectOption, false, ReactSelectOptGroup>> = (styles) => (provided) => ({
  ...provided,
  ...styles,
  zIndex: 12,
  margin: '4px 0 0',
  borderRadius: '0.5rem',
});
