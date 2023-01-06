import { CSSObjectWithLabel, GroupBase, OptionProps } from 'react-select';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const optionStyles: (
  customStyles: CustomReactSelectStyles,
) => (
  provided: CSSObjectWithLabel,
  props: OptionProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel =
  ({ width, activeText }) =>
  (provided) => ({
    ...provided,
    cursor: 'pointer',
    width,
    border: 0,
    boxShadow: 'none',
    fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
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
