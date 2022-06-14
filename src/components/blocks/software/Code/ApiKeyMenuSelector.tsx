import React, { useEffect } from 'react';
import { DEFAULT_API_KEY_MESSAGE } from '.';
import APIKeyIndicator from './ApiKeyIndicator';
import APIKeyMenu, { APIKeyMenuProps, Option } from './ApiKeyMenu';

type APIKeyMenuSelectorProps = {
  dataContainsKey: boolean;
  signedIn: boolean;
  activeApiKey: Option;
} & APIKeyMenuProps;

const APIKeyMenuSelector = ({
  dataContainsKey,
  userApiKeys,
  setActiveApiKey,
  activeApiKey,
  signedIn = false,
}: APIKeyMenuSelectorProps) => {
  useEffect(() => {
    if (activeApiKey.value === DEFAULT_API_KEY_MESSAGE && userApiKeys) {
      const { name: label, whole_key: value } = userApiKeys[0].apiKeys[0];
      setActiveApiKey({
        label,
        value,
      });
    }
  }, [userApiKeys, activeApiKey, setActiveApiKey]);
  return dataContainsKey ? (
    signedIn && userApiKeys ? (
      <APIKeyMenu userApiKeys={userApiKeys} setActiveApiKey={setActiveApiKey} />
    ) : (
      <APIKeyIndicator />
    )
  ) : null;
};

export default APIKeyMenuSelector;
