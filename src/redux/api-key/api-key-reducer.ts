import { API_KEY_LOADED_EVENT, API_KEYS_REDUCER_KEY } from './constants';

type ApiKeyState = {
  data: Record<string, unknown>;
};

type Action = {
  payload: Record<string, unknown>;
  type: string;
};

const initialState: ApiKeyState = { data: {} };

export const reducerApiKeyData = {
  [API_KEYS_REDUCER_KEY]: (state = initialState, action: Action) => {
    switch (action.type) {
      case API_KEY_LOADED_EVENT:
        return { ...state, data: { ...state.data, ...action.payload } };
      default:
        return state;
    }
  },
};
