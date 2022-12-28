import { GroupHeadingProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';

export const groupHeadingStyles: StylesConfigFunction<
  GroupHeadingProps<ReactSelectOption, false, ReactSelectOptGroup>
> = (provided) => ({
  ...provided,
  letterSpacing: '0.1em',
  color: '--var(cool-black)',
  zIndex: 12,
  padding: 0,
});
