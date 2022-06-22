import { API_KEY_LOADED_EVENT, API_KEYS_REDUCER_KEY } from './constants';

export type ApiKeyValue = {
  name: string;
  url: string;
};

type ApiKeyState = {
  data: Array<Record<string, ApiKeyValue>>;
};

type Action = {
  payload: Record<string, unknown>;
  type: typeof API_KEY_LOADED_EVENT;
};

const initialState: ApiKeyState = { data: [] };

export const reducerApiKeyData = {
  [API_KEYS_REDUCER_KEY]: (state: ApiKeyState = initialState, action: Action) => {
    switch (action.type) {
      case API_KEY_LOADED_EVENT:
        return { ...state, data: action.payload };
      default:
        return state;
    }
  },
};
