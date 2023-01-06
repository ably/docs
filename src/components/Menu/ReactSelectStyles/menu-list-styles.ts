import { CSSObjectWithLabel, GroupBase, MenuListProps } from 'react-select';

export const menuListStyles: (
  provided: CSSObjectWithLabel,
  props: MenuListProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (provided) => ({
  ...provided,
  height: 'initial',
  maxHeight: 'initial',
  boxShadow: '0px 24px 32px rgba(0, 0, 0, 0.05)',
  padding: 16,
});
