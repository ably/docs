import React, { SetStateAction, useState } from 'react';
import Select, { CSSObjectWithLabel, StylesConfig } from 'react-select';
import { primary } from '../../../../styles/colors';
import { SmallMenuLabel } from '../../../Menu/Label';

const VALUE_PREFIX = 'API Key: ';

const SELECT_HEIGHT = '24px';

type AppApiKey = {
  name: string;
  whole_key: string;
};

export type UserApiKey = {
  name: string;
  url: string;
  apiKeys: AppApiKey[];
};

const errorOption = {
  label: 'No API keys found',
  value: 'Placeholder: replace with default API Key',
};

const makeLabel = (apiKey: AppApiKey) => `${VALUE_PREFIX}${apiKey.name}`;

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

const selectMenuStyles: StylesConfig<SetStateAction<{ label: string; value: string }>, false> = {
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

const APIKeyMenu = ({ userApiKeys }: { userApiKeys: UserApiKey[] }) => {
  const initialApiKeyOption = userApiKeys[0].apiKeys;
  const [value, setValue] = useState(
    initialApiKeyOption
      ? {
          label: `${makeLabel(initialApiKeyOption[0])}`,
          value: initialApiKeyOption[0].whole_key,
        }
      : errorOption,
  );

  const options = userApiKeys.map((userApiKey) => ({
    label: userApiKey.name,
    options: userApiKey.apiKeys.map((appApiKey) => ({
      label: makeLabel(appApiKey),
      value: appApiKey.whole_key,
    })),
  }));
  return (
    <>
      <SmallMenuLabel>API Key:</SmallMenuLabel>
      <Select
        value={value}
        onChange={(value) => setValue(value ?? errorOption)}
        options={options}
        styles={selectMenuStyles}
      />
    </>
  );
};

export default APIKeyMenu;
