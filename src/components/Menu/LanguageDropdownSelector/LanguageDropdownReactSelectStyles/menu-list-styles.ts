import { MenuListProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from '../../react-select-option-types';

export const menuListStyles: StylesConfigFunction<MenuListProps<ReactSelectOption, false, ReactSelectOptGroup>> = (
  provided,
) => ({
  ...provided,
  minHeight: '512px',
});
