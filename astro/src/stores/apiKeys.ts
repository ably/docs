import { atom } from 'nanostores';

export interface ApiKey {
  name: string;
  url: string;
}

/**
 * Demo API keys for the signed-in user. Populated by UserProvider from
 * WEB_API_KEYS_DATA_ENDPOINT. Replaces `reducerApiKeyData` from the old
 * Redux store.
 */
export const $apiKeys = atom<ApiKey[]>([]);
