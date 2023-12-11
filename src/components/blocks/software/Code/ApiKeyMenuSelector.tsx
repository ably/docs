import { useEffect } from 'react';
import { ReactSelectOption } from 'src/components';
import { DEFAULT_API_KEY_MESSAGE } from '.';
import APIKeyIndicator from './ApiKeyIndicator';
import APIKeyMenu, { APIKeyMenuProps } from './ApiKeyMenu';
import { SmallMenuLabel } from '../../../Menu/Label';
import { atLeastOneAppHasApiKeys, findFirstApiKey } from './util';

const NO_API_KEY_TOOLTIP =
  'This code example uses a temporary key that is rate limited and expires in 4 hours. Sign in to Ably to use your API keys instead.';

type APIKeyMenuSelectorProps = APIKeyMenuProps & {
  dataContainsKey: boolean;
  signedIn: boolean;
  activeApiKey: ReactSelectOption;
};

const APIKeyMenuSelector = ({
  dataContainsKey,
  apps,
  setActiveApiKey,
  activeApiKey,
  signedIn = false,
}: APIKeyMenuSelectorProps) => {
  useEffect(() => {
    const firstFoundKey = findFirstApiKey(apps);

    if (activeApiKey.value === DEFAULT_API_KEY_MESSAGE && firstFoundKey) {
      const { name: label, whole_key: value } = firstFoundKey;
      setActiveApiKey({
        label,
        value,
      });
    }
  }, [apps, activeApiKey, setActiveApiKey]);

  return dataContainsKey ? (
    <div className="border-t border-charcoal-grey py-14 px-16 flex items-center">
      <SmallMenuLabel>API Key:</SmallMenuLabel>
      {signedIn && atLeastOneAppHasApiKeys(apps) ? (
        <APIKeyMenu apps={apps} setActiveApiKey={setActiveApiKey} />
      ) : (
        <APIKeyIndicator tooltip={NO_API_KEY_TOOLTIP} />
      )}
    </div>
  ) : null;
};

export default APIKeyMenuSelector;
