import { SetStateAction } from 'react';
import { CSSObjectWithLabel, StylesConfig } from 'react-select';
import { gui } from 'src/styles/colors';

const SELECT_HEIGHT = '24px';

const optionStyles = {
  border: 0,
  margin: 0,
  width: 200,
  color: '#D9D9DA',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
  fontSize: 14,
  fontWeight: 300,
  '&:active': {
    backgroundColor: gui.active,
  },
};

const controlStyles = (provided: CSSObjectWithLabel) => ({
  ...provided,
  width: 200,
  border: 0,
  margin: 0,
  color: '#D9D9DA',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
  fontSize: '14px',
  lineHeight: 'var(--lh-snug)',
  height: SELECT_HEIGHT,
  minHeight: SELECT_HEIGHT,
});

export const selectMenuStyles: StylesConfig<SetStateAction<{ label: string; value: string }>, false> = {
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: controlStyles,
  singleValue: (provided: CSSObjectWithLabel) => ({ ...provided, ...optionStyles }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: 'white',
    top: '1em',
    right: 0,
    boxShadow: '0px 24px 80px rgba(0, 0, 0, 0.1)',
    padding: 8,
    border: '1px solid #F5F5F6',
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
    color: '#76767C',
    padding: '0 8px',
  }),
  menuList: (provided: CSSObjectWithLabel) => ({
    ...provided,
    padding: 0,
  }),
  input: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: '#D9D9DA',
  }),
  dropdownIndicator: (provided: CSSObjectWithLabel) => ({
    ...provided,
    height: SELECT_HEIGHT,
    padding: '2px 8px 8px 8px',
    verticalAlign: 'center',
    color: '#D9D9DA',
    '&:hover': {
      color: 'white',
    },
  }),
};
