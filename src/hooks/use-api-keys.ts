import { useEffect, useState } from 'react';

import { connectState, getRemoteDataStore } from '@ably/ui/core/scripts';

import { fetchApiKeyData } from 'src/redux/api-key';
import { selectData } from 'src/redux/select-data';
import { API_KEYS_REDUCER_KEY, WEB_API_KEYS_DATA_ENDPOINT } from 'src/redux/api-key/constants';

const apiKeysInit = { data: [] };

const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<{ data: UserApiKey[] }>(apiKeysInit);

  useEffect(() => {
    const store = getRemoteDataStore();

    connectState(selectData(API_KEYS_REDUCER_KEY), (state: { data?: UserApiKey[] }) => {
      const data = Array.isArray(state?.data) ? state.data : [];
      setApiKeys({ data });
    });

    fetchApiKeyData(store, WEB_API_KEYS_DATA_ENDPOINT);
  }, []);

  return { apiKeys };
};

export { useApiKeys };
