import { ControlProps, CSSObjectWithLabel, GroupBase } from 'react-select';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const controlStyles: (
  customStyles: CustomReactSelectStyles,
) => (
  provided: CSSObjectWithLabel,
  props: ControlProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (customStyles) => (provided) => ({
  ...provided,
  ...customStyles,
  fontWeight: '500',
  boxShadow: 'none',
  cursor: 'pointer',
  fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
  fontSize: '14px',
});
