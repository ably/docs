import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import { Header } from '../Header';
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
import { VersionMenuProps } from '../Menu/VersionMenu';
import { LeftSideBar } from '../StaticQuerySidebar';
import TopCodeMenu from '../Menu/TopCodeMenu';

const hubspotTrackingId = process.env.HUBSPOT_TRACKING_ID;
const googleTagManagerAuthToken = process.env.GATSBY_GOOGLE_TAG_MANAGER_AUTH_TOKEN;
const googleTagManagerPreview = process.env.GATSBY_GOOGLE_TAG_MANAGER_PREVIEW;

const Layout: FC<{ languages: Array<string>; versionData: VersionMenuProps }> = ({
  languages,
  versionData,
  children,
}) => {
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

  const languageAlternativesExist = languages && languages.length > 1;
  return (
    <UserContext.Provider value={userState}>
      {process.env.GATSBY_GOOGLE_TAG_MANAGER_AUTH_TOKEN && process.env.GATSBY_GOOGLE_TAG_MANAGER_PREVIEW ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=GTM-TZ37KKW&gtm_auth=${googleTagManagerAuthToken}&gtm_preview=${googleTagManagerPreview}&gtm_cookies_win=x`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
      ) : null}
      {hubspotTrackingId ? <Script src={`//js.hs-scripts.com/${hubspotTrackingId}.js`} id="hs-script-loader" /> : null}
      <Header />
      <div className="grid grid-cols-5 2xl:grid-cols-7">
        <LeftSideBar className="col-span-1 bg-extra-light-grey px-24" />
        <TopCodeMenu languages={languages} versionData={versionData} />
        <main
          className={`${
            languageAlternativesExist ? 'pt-128' : 'pt-96'
          } ml-24 col-span-4 grid grid-cols-4 2xl:grid-cols-6 2xl:col-span-6`}
        >
          {children}
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default Layout;
