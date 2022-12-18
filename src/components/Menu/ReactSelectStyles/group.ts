import { GroupProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';

export const groupStyles: StylesConfigFunction<GroupProps<ReactSelectOption, false, ReactSelectOptGroup>> = (
  provided,
) => ({
  ...provided,
  padding: 0,
});
