import { MenuProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';

export const menuStyles: StylesConfigFunction<MenuProps<ReactSelectOption, false, ReactSelectOptGroup>> = (
  provided,
) => ({
  ...provided,
  zIndex: 12,
});
