import { CSSObjectWithLabel, GroupBase, MenuProps } from 'react-select';
import { CustomReactSelectStyles } from './custom-react-select-styles';

export const menuStyles: (
  customStyles: CustomReactSelectStyles,
) => (
  provided: CSSObjectWithLabel,
  props: MenuProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (styles) => (provided) => ({
  ...provided,
  ...styles,
  zIndex: 12,
  margin: '4px 0 0',
});
