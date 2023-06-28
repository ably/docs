import React, { useEffect } from 'react';
import { ReactSelectOption } from 'src/components';
import { DEFAULT_API_KEY_MESSAGE } from '.';
import APIKeyIndicator from './ApiKeyIndicator';
import APIKeyMenu, { APIKeyMenuProps } from './ApiKeyMenu';
import { SmallMenuLabel } from '../../../Menu/Label';

const NO_API_KEY_TOOLTIP =
  'This code example uses a temporary key that is rate limited and expires in 4 hours. Sign in to Ably to use your API keys instead.';

type APIKeyMenuSelectorProps = APIKeyMenuProps & {
  dataContainsKey: boolean;
  signedIn: boolean;
  activeApiKey: ReactSelectOption;
};

const APIKeyMenuSelector = ({
  dataContainsKey,
  userApiKeys,
  setActiveApiKey,
  activeApiKey,
  signedIn = false,
}: APIKeyMenuSelectorProps) => {
  useEffect(() => {
    if (activeApiKey.value === DEFAULT_API_KEY_MESSAGE && userApiKeys.length > 0) {
      const { name: label, whole_key: value } = userApiKeys[0].apiKeys[0];
      setActiveApiKey({
        label,
        value,
      });
    }
  }, [userApiKeys, activeApiKey, setActiveApiKey]);

  return dataContainsKey ? (
    <div className="border-t border-charcoal-grey py-14 px-16 flex items-center">
      <SmallMenuLabel>API Key:</SmallMenuLabel>
      {signedIn && userApiKeys.length > 0 ? (
        <APIKeyMenu userApiKeys={userApiKeys} setActiveApiKey={setActiveApiKey} />
      ) : (
        <APIKeyIndicator tooltip={NO_API_KEY_TOOLTIP} />
      )}
    </div>
  ) : null;
};

export default APIKeyMenuSelector;
