import React, { Dispatch, useState } from 'react';
import { Select } from 'src/components';
import { DEFAULT_API_KEY_MESSAGE } from '.';

export type Option = {
  label: string;
  value: string;
};

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

const makeLabel = (apiKey: AppApiKey) => {
  return `${apiKey.whole_key.slice(0, 10)}... - ${apiKey.name}`;
};

export type APIKeyMenuProps = {
  userApiKeys: UserApiKey[];
  setActiveApiKey: Dispatch<React.SetStateAction<Option>>;
};

const APIKeyMenu = ({ userApiKeys, setActiveApiKey }: APIKeyMenuProps) => {
  const initialApiKeyOption = userApiKeys[0].apiKeys;

  const [value, setValue] = useState(
    initialApiKeyOption
      ? {
          label: makeLabel(initialApiKeyOption[0]),
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
    <Select
      value={value}
      isSearchable={false}
      onChange={(value) => {
        // @ts-ignore - TODO: fix react-select props
        setValue(value ?? errorOption);
        // @ts-ignore - TODO: fix react-select props
        setActiveApiKey(value ?? { label: DEFAULT_API_KEY_MESSAGE, value: DEFAULT_API_KEY_MESSAGE });
      }}
      options={options}
    />
  );
};

export default APIKeyMenu;
