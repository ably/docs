import { SetStateAction } from 'react';
import { CSSObjectWithLabel, StylesConfig } from 'react-select';
import { gui } from 'src/styles/colors';

const SELECT_HEIGHT = '24px';

const optionStyles = {
  border: 0,
  margin: 0,
  width: 200,
  color: 'var(--color-white)',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
  fontSize: 14,
  fontWeight: 300,
  '&:active': {
    backgroundColor: gui.active,
  },
};

export const selectMenuStyles: StylesConfig<SetStateAction<{ label: string; value: string }>, false> = {
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    border: 0,
    margin: 0,
    color: 'var(--color-white)',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
    fontSize: '14px',
    lineHeight: 'var(--lh-snug)',
    height: SELECT_HEIGHT,
    minHeight: SELECT_HEIGHT,
  }),
  singleValue: (provided: CSSObjectWithLabel) => ({ ...provided, ...optionStyles }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: 'var(--color-white)',
    top: '1em',
    right: 0,
    boxShadow: '0px 24px 80px rgba(0, 0, 0, 0.1)',
    padding: 8,
    border: '1px solid var(--color-light-grey)',
    borderRadius: 6,
    width: 275,
  }),
  group: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: 0,
  }),
  groupHeading: (provided: CSSObjectWithLabel) => ({
    ...provided,
    ...optionStyles,
    color: 'var(--color-dark-grey)',
    padding: '0 8px',
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: 0,
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: 'var(--color-white)',
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: SELECT_HEIGHT,
    padding: '2px 8px 8px 8px',
    verticalAlign: 'center',
    color: 'var(--color-white)',
  }),
};
