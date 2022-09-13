import { SingleValueProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';

export const singleValueStyles: StylesConfigFunction<
  SingleValueProps<ReactSelectOption, false, ReactSelectOptGroup>
> = (provided) => ({
  ...provided,
  color: 'var(--color-active-orange)',
});
