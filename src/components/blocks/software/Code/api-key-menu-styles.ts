import { SetStateAction } from 'react';
import { CSSObjectWithLabel, StylesConfig } from 'react-select';
import { gui, primary } from '../../../../styles/colors';

const SELECT_HEIGHT = '24px';

const optionStyles = (provided: CSSObjectWithLabel) => ({
  ...provided,
  width: '200px',
  border: 0,
  margin: 0,
  color: '#D9D9DA',
  backgroundColor: primary.charcoalGrey,
  boxShadow: 'none',
  fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
  fontSize: '14px',
  '&:active': {
    ...provided[':active'],
    backgroundColor: gui.active,
  },
});

const controlStyles = (provided: CSSObjectWithLabel) => ({
  ...provided,
  width: '200px',
  border: 0,
  margin: 0,
  color: '#D9D9DA',
  backgroundColor: primary.charcoalGrey,
  boxShadow: 'none',
  fontFamily: `NEXT Book,Arial,Helvetica,sans-serif`,
  fontSize: '14px',
  lineHeight: 'var(--lh-snug)',
  height: SELECT_HEIGHT,
  minHeight: SELECT_HEIGHT,
});

const heightStyles = (provided: CSSObjectWithLabel) => ({
  ...provided,
  height: SELECT_HEIGHT,
});

export const selectMenuStyles: StylesConfig<SetStateAction<{ label: string; value: string }>, false> = {
  container: (provided: CSSObjectWithLabel) => ({
    ...provided,
    position: 'absolute',
    top: '0.25em',
    left: '0.25em',
    backgroundColor: primary.charcoalGrey,
    minHeight: SELECT_HEIGHT,
    height: SELECT_HEIGHT,
  }),
  valueContainer: heightStyles,
  indicatorSeparator: () => ({
    display: 'none',
  }),
  control: controlStyles,
  option: optionStyles,
  singleValue: optionStyles,
  groupHeading: optionStyles,
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: primary.charcoalGrey,
    top: '1em',
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
