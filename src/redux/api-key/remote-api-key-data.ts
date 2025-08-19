import { isArray } from 'lodash';
import { pick } from 'lodash/fp';
import { addDataToStore, DEFAULT_CACHE_STRATEGY, getJsonResponse } from '../fetch-and-add-to-store';
import { ApiKeyValue } from './api-key-reducer';
import { API_KEY_LOADED_EVENT, WEB_API_TEMP_KEY_ENDPOINT } from './constants';

declare global {
  interface Window {
    ably: {
      docs: {
        DOCS_API_KEY: boolean | string;
        randomChannelName: string;
        onApiKeyRetrieved: () => void;
      };
    };
  }
}

const safelyInvokeApiKeyRetrievalTrigger = () => {
  try {
    window.ably.docs.onApiKeyRetrieved();
  } catch (e) {
    console.error(e);
  }
};

const fetchDemoApiKey = async () => {
  const tempApiKeyResponse = await fetch(WEB_API_TEMP_KEY_ENDPOINT, { cache: DEFAULT_CACHE_STRATEGY });
  const tempApiKey = await tempApiKeyResponse.text();

  if (window.ably?.docs && !window.ably.docs.DOCS_API_KEY) {
    window.ably.docs.DOCS_API_KEY = tempApiKey;
    safelyInvokeApiKeyRetrievalTrigger();
  }

  return {
    name: 'Demo Only',
    demo: true,
    url: WEB_API_TEMP_KEY_ENDPOINT,
    apiKeys: [
      {
        name: 'Demo Only',
        whole_key: tempApiKey,
      },
    ],
  };
};

const retrieveApiKeyDataFromApiKeyUrl = async (payload: Record<string, unknown>) => {
  // Always fetch the demo key
  const demoApiKey = await fetchDemoApiKey();

  // If there's no valid payload, return only the demo key
  if (payload.error || !payload.data || !isArray(payload.data)) {
    return {
      data: [demoApiKey],
    };
  }

  // Fetch actual API keys from the payload
  const apiKeyData = await Promise.all(
    payload.data.map(async (value: ApiKeyValue) => {
      try {
        const apiKeysRaw = await getJsonResponse(value.url, 'api-key-retrieval');
        const apiKeys = apiKeysRaw.map(pick(['name', 'whole_key']));
        return { ...value, apiKeys, demo: false };
      } catch (error) {
        return null;
      }
    }),
  );

  /**
   * Supporting ad hoc scripts; the following lines can be removed when ad hoc scripts are.
   */
  if (window.ably?.docs && apiKeyData[0]) {
    window.ably.docs.DOCS_API_KEY = apiKeyData[0].apiKeys[0].whole_key;
    safelyInvokeApiKeyRetrievalTrigger();
  }
  /**
   * Supporting ad hoc scripts; the preceding lines can be removed when ad hoc scripts are.
   */

  // Return both actual keys and demo key
  return {
    ...payload,
    data: [demoApiKey, ...apiKeyData.filter(Boolean)],
  };
};

export const fetchApiKeyData = async (store: Store, apiKeyUrl: string): Promise<void> =>
  addDataToStore(store, apiKeyUrl, API_KEY_LOADED_EVENT, retrieveApiKeyDataFromApiKeyUrl);
