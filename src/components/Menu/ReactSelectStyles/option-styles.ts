import { OptionProps } from 'react-select';
import { StylesConfigFunction } from 'react-select/dist/declarations/src/styles';
import { ReactSelectOptGroup, ReactSelectOption } from 'src/components';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const optionStyles: (
  customStyles: CustomReactSelectStyles,
) => StylesConfigFunction<OptionProps<ReactSelectOption, false, ReactSelectOptGroup>> =
  ({ width, activeText }) =>
  (provided) => ({
    ...provided,
    cursor: 'pointer',
    width,
    border: 0,
    boxShadow: 'none',
    fontFamily: `font-manrope, NEXT Book,Arial,Helvetica,sans-serif`,
    color: 'var(--color-cool-black)',
    backgroundColor: 'transparent',
    fontSize: '14px',
    '&:hover': {
      color: activeText ? activeText : 'var(--color-gui-hover)',
      backgroundColor: 'white',
    },
    '&:focus': {
      color: activeText ? activeText : 'var(--color-gui-hover)',
      backgroundColor: 'white',
    },
    '&:target': {
      color: activeText ? activeText : 'var(--color-gui-hover)',
      backgroundColor: 'white',
    },
    padding: '0 8px',
    margin: '8px 0 0',
  });
