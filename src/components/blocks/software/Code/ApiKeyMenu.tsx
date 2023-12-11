import { Dispatch, useState, SetStateAction } from 'react';
import { SingleValue } from 'react-select';
import { Select, ReactSelectOption } from 'src/components';
import { DEFAULT_API_KEY_MESSAGE } from '.';
import { findFirstApiKey } from './util';

import { type App, type AppApiKey } from 'src/contexts/user-context';

import { container } from './ApiKeyMenu.module.css';

const errorOption = {
  label: 'No API keys found',
  value: 'Placeholder: replace with default API Key',
};

const makeLabel = (apiKey: AppApiKey) => {
  return `${apiKey.whole_key.slice(0, 10)}... - ${apiKey.name}`;
};

export type APIKeyMenuProps = {
  apps: App[];
  setActiveApiKey: Dispatch<SetStateAction<ReactSelectOption>>;
};

const APIKeyMenu = ({ apps, setActiveApiKey }: APIKeyMenuProps) => {
  const initialApiKeyOption = findFirstApiKey(apps);

  const [value, setValue] = useState<ReactSelectOption>(
    initialApiKeyOption
      ? {
          label: makeLabel(initialApiKeyOption),
          value: initialApiKeyOption.whole_key,
        }
      : errorOption,
  );

  const options = apps.map((app) => ({
    label: app.name,
    options: app.apiKeys.map((appApiKey) => ({
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
