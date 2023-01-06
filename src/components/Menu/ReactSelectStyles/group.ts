import { CSSObjectWithLabel, GroupBase, GroupProps } from 'react-select';

export const groupStyles: (
  provided: CSSObjectWithLabel,
  props: GroupProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (provided) => ({
  ...provided,
  padding: 0,
});
