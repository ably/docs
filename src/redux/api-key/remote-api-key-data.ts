import { isArray } from 'lodash';
import { pick } from 'lodash/fp';
import { addDataToStore, DEFAULT_CACHE_STRATEGY, getJsonResponse } from '../fetch-and-add-to-store';
import { ApiKeyValue } from './api-key-reducer';
import { API_KEY_LOADED_EVENT, WEB_API_TEMP_KEY_ENDPOINT } from './constants';

const retrieveApiKeyDataFromApiKeyUrl = async (payload: Record<string, unknown>) => {
  if (payload.error) {
    console.error(`Error retrieving data from url, ${payload.error}`);
    return { data: null };
  }
  if (!payload.data || !isArray(payload.data)) {
    console.warn('No data array on API Key payload object returned from endpoint');
    const tempApiKeyResponse = await fetch(WEB_API_TEMP_KEY_ENDPOINT, { cache: DEFAULT_CACHE_STRATEGY });
    const tempApiKey = await tempApiKeyResponse.text();
    return {
      data: [
        {
          name: 'Demo Only',
          url: WEB_API_TEMP_KEY_ENDPOINT,
          apiKeys: [
            {
              name: 'Demo Only',
              whole_key: tempApiKey,
            },
          ],
        },
      ],
    };
  }
  const apiKeyData = await Promise.all(
    payload.data.map(async (value: ApiKeyValue) => {
      const apiKeysRaw = await getJsonResponse(value.url, 'api-key-retrieval');
      const apiKeys = apiKeysRaw.map(pick(['name', 'whole_key']));
      return { ...value, apiKeys };
    }),
  );
  return {
    ...payload,
    data: apiKeyData,
  };
};

export const fetchApiKeyData = async (store: Store, apiKeyUrl: string): Promise<void> =>
  addDataToStore(store, apiKeyUrl, API_KEY_LOADED_EVENT, retrieveApiKeyDataFromApiKeyUrl);
