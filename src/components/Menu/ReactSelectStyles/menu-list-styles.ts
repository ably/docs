import { MenuListProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';

export const menuListStyles: StylesConfigFunction<MenuListProps<ReactSelectOption, false, ReactSelectOptGroup>> = (
  provided: Record<string, string>,
) => ({
  ...provided,
  height: 'initial',
  maxHeight: 'initial',
  boxShadow: '0 24px 80px 0 rgba(0, 0, 0, 0.10)',
  padding: 16,
});
