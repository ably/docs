import { ControlProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const controlStyles: (
  customStyles: CustomReactSelectStyles,
) => StylesConfigFunction<ControlProps<ReactSelectOption, false, ReactSelectOptGroup>> =
  (customStyles) => (provided: Record<string, string>) => ({
    ...provided,
    ...customStyles,
    fontWeight: '500',
    boxShadow: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '0.375rem',
  });
