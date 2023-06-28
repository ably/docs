import React, { Dispatch, useState, SetStateAction } from 'react';
import { SingleValue } from 'react-select';
import { Select, ReactSelectOption } from 'src/components';
import { DEFAULT_API_KEY_MESSAGE } from '.';

import { container } from './ApiKeyMenu.module.css';

export type AppApiKey = {
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
  setActiveApiKey: Dispatch<SetStateAction<ReactSelectOption>>;
};

const APIKeyMenu = ({ userApiKeys, setActiveApiKey }: APIKeyMenuProps) => {
  const initialApiKeyOption = userApiKeys[0].apiKeys;

  const [value, setValue] = useState<ReactSelectOption>(
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
    <div className={container}>
      <Select
        value={value}
        isSearchable={false}
        onChange={(newValue: SingleValue<SetStateAction<ReactSelectOption>>) => {
          setValue(newValue ?? errorOption);
          setActiveApiKey(newValue ?? { label: DEFAULT_API_KEY_MESSAGE, value: DEFAULT_API_KEY_MESSAGE });
        }}
        options={options}
      />
    </div>
  );
};

export default APIKeyMenu;
