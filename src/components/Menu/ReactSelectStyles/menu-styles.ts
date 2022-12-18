import { MenuProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';

export const menuStyles: StylesConfigFunction<MenuProps<ReactSelectOption, false, ReactSelectOptGroup>> = (
  provided,
) => ({
  ...provided,
  zIndex: 12,
  width: 300,
  right: 0,
  margin: '4px 0 0',
});
