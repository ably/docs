import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import Header from '../Header';
// Session-related scripts
import '@ably/ui/core/scripts';
import {
  connectState,
  loadSprites,
  selectSessionData,
  fetchSessionData,
  getRemoteDataStore,
} from '@ably/ui/core/scripts';
import sprites from '@ably/ui/core/sprites.svg';
import UserContext, { UserDetails } from '../../contexts/user-context';
import { fetchApiKeyData } from '../../redux/api-key';
import { selectData } from '../../redux/select-data';
import {
  API_KEYS_REDUCER_KEY,
  WEB_API_KEYS_DATA_ENDPOINT,
  WEB_API_USER_DATA_ENDPOINT,
} from '../../redux/api-key/constants';
import { Script } from 'gatsby';
import { hubspotIdentifyUser } from '../../third-party/hubspot';

const hubspotTrackingId = process.env.HUBSPOT_TRACKING_ID;

const Layout: FC<{ languages: Array<string> }> = ({ languages, children }) => {
  const [sessionState, setSessionState] = useState({});
  const [apiKeys, setApiKeys] = useState({});

  useEffect(() => {
    const store = getRemoteDataStore();

    loadSprites(sprites);

    connectState(selectSessionData, setSessionState);
    fetchSessionData(store, WEB_API_USER_DATA_ENDPOINT);

    connectState(selectData(API_KEYS_REDUCER_KEY), setApiKeys);
    fetchApiKeyData(store, WEB_API_KEYS_DATA_ENDPOINT);
  }, []);

  useEffect(() => hubspotIdentifyUser(sessionState), [sessionState]);

  const userState: UserDetails = { sessionState, apiKeys };
  return (
    <UserContext.Provider value={userState}>
      {hubspotTrackingId && <Script src={`//js.hs-scripts.com/${hubspotTrackingId}.js`} id="hs-script-loader" />}
      <header>
        <Header languages={languages} />
      </header>
      <main className={`${languages && languages.length > 1 ? 'pt-128' : 'pt-96'} grid grid-cols-5`}>{children}</main>
    </UserContext.Provider>
  );
};

export default Layout;
