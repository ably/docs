import { ControlProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from '../react-select-option-types';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const controlStyles: (
  customStyles: CustomReactSelectStyles,
) => StylesConfigFunction<ControlProps<ReactSelectOption, false, ReactSelectOptGroup>> =
  ({ width }) =>
  (provided) => ({
    ...provided,
    width,
    boxShadow: 'none',
    fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
    fontSize: '14px',
  });
