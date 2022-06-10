import React, { useState } from 'react';
import Select from 'react-select';

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

const makeLabel = (apiKey: AppApiKey) => `${apiKey.name} | ${apiKey.whole_key.substring(0, 5)}...`;

const APIKeyMenu = ({ userApiKeys }: { userApiKeys: UserApiKey[] }) => {
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
    <div className="docs-api-key-label">
      <Select value={value} onChange={(value) => setValue(value ?? errorOption)} options={options} />
    </div>
  );
};

export default APIKeyMenu;
