import { ControlProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const controlStyles: (
  customStyles: CustomReactSelectStyles,
) => StylesConfigFunction<ControlProps<ReactSelectOption, false, ReactSelectOptGroup>> =
  (customStyles) => (provided) => ({
    ...provided,
    ...customStyles,
    fontWeight: '500',
    boxShadow: 'none',
    cursor: 'pointer',
    fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
    fontSize: '14px',
  });
