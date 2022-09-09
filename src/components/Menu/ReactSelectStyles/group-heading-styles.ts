import { GroupHeadingProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from '../react-select-option-types';

export const groupHeadingStyles: StylesConfigFunction<
  GroupHeadingProps<ReactSelectOption, false, ReactSelectOptGroup>
> = (provided) => ({
  ...provided,
  letterSpacing: '0.1em',
  color: '--var(cool-black)',
  zIndex: 12,
});
