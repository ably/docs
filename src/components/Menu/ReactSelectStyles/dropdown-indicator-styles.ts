import { CSSObjectWithLabel, DropdownIndicatorProps, GroupBase } from 'react-select';

export const dropdownIndicatorStyles: (
  provided: CSSObjectWithLabel,
  props: DropdownIndicatorProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (provided) => ({
  ...provided,
  color: 'var(--color-cool-black)',
  '&:hover': {
    color: 'var(--color-gui-hover)',
  },
});
