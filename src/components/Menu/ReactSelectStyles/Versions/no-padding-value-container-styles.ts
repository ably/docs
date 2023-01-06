import { CSSObjectWithLabel, GroupBase, ValueContainerProps } from 'react-select';

export const noPaddingValueContainerStyles: (
  provided: CSSObjectWithLabel,
  props: ValueContainerProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (provided) => ({
  ...provided,
  padding: '0',
});
