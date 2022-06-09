import { addDataToStore } from '../fetch-and-add-to-store';
import { API_KEY_LOADED_EVENT } from './constants';

export const fetchApiKeyData = async (store: Store, apiKeyUrl: string): Promise<void> =>
  addDataToStore(store, apiKeyUrl, API_KEY_LOADED_EVENT);
