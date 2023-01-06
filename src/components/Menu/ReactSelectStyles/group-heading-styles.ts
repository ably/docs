import { CSSObjectWithLabel, GroupBase, GroupHeadingProps } from 'react-select';

export const groupHeadingStyles: (
  provided: CSSObjectWithLabel,
  props: GroupHeadingProps<{ label: string; value: string }, false, GroupBase<{ label: string; value: string }>>,
) => CSSObjectWithLabel = (provided) => ({
  ...provided,
  letterSpacing: '0.1em',
  color: '--var(cool-black)',
  zIndex: 12,
  padding: 0,
});
