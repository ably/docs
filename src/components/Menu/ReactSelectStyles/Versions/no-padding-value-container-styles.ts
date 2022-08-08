import { ValueContainerProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from '../../react-select-option-types';

export const noPaddingValueContainerStyles: StylesConfigFunction<
  ValueContainerProps<ReactSelectOption, false, ReactSelectOptGroup>
> = (provided) => ({
  ...provided,
  padding: '0',
});
