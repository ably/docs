import React from 'react';
import APIKeyIndicator from './ApiKeyIndicator';
import APIKeyMenu, { UserApiKey } from './ApiKeyMenu';

type APIKeyMenuSelectorProps = {
  dataContainsKey: boolean;
  userApiKeys: UserApiKey[];
  signedIn: boolean;
};

const APIKeyMenuSelector = ({ dataContainsKey, userApiKeys, signedIn = false }: APIKeyMenuSelectorProps) =>
  dataContainsKey ? signedIn && userApiKeys ? <APIKeyMenu userApiKeys={userApiKeys} /> : <APIKeyIndicator /> : null;

export default APIKeyMenuSelector;
