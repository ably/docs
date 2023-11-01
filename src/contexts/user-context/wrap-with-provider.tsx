import React, { useContext, useEffect, useState } from 'react';

import { connectState, selectSessionData, fetchSessionData, getRemoteDataStore } from '@ably/ui/core/scripts';
import { fetchApiKeyData } from 'src/redux/api-key';
import { selectData } from 'src/redux/select-data';
import {
  API_KEYS_REDUCER_KEY,
  WEB_API_KEYS_DATA_ENDPOINT,
  WEB_API_USER_DATA_ENDPOINT,
} from 'src/redux/api-key/constants';

import UserContext, { UserDetails, type UserApiKey, SessionState } from '../user-context';

//
// This wrapper component is responsible for loading up our user session and
// user/demo API keys and make it available to all our pages via the
// UserContext.
//
export const UserContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userContext = useContext(UserContext);
  const [userState, setUserState] = useState<UserDetails>(userContext);

  useEffect(() => {
    const store = getRemoteDataStore();

    connectState(selectSessionData, (session: SessionState) => {
      setUserState((existing) => ({ ...existing, sessionState: session }));
    });

    fetchSessionData(store, WEB_API_USER_DATA_ENDPOINT);

    connectState(selectData(API_KEYS_REDUCER_KEY), (state: { data?: UserApiKey[] }) => {
      const data = Array.isArray(state?.data) ? state.data : [];
      setUserState((existing) => ({ ...existing, apiKeys: { data } }));
    });

    fetchApiKeyData(store, WEB_API_KEYS_DATA_ENDPOINT);
  }, []);

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
};

// This little indirection is needed so we can make use of hooks in our wrapper component
const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <UserContextWrapper>{element}</UserContextWrapper>
);

export default wrapRootElement;
