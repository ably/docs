import { isArray } from 'lodash';
import { pick } from 'lodash/fp';
import { addDataToStore, getJsonResponse } from '../fetch-and-add-to-store';
import { ApiKeyValue } from './api-key-reducer';
import { API_KEY_LOADED_EVENT } from './constants';

const retrieveApiKeyDataFromApiKeyUrl = async (payload: Record<string, unknown>) => {
  if (!payload.data || !isArray(payload.data)) {
    console.warn('No data array on API Key payload object returned from endpoint');
    return { data: null };
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
