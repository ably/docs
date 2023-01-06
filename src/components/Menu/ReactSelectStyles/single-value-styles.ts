import { CSSObjectWithLabel, GroupBase, SingleValueProps } from 'react-select';

export const singleValueStyles: (
  provided: CSSObjectWithLabel,
  props: SingleValueProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (provided) => ({
  ...provided,
  color: 'var(--color-active-orange)',
});
