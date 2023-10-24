import React, { FunctionComponent as FC, useEffect, useState } from 'react';
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
import UserContext, { UserDetails, type UserApiKey } from '../../contexts/user-context';
import { fetchApiKeyData } from '../../redux/api-key';
import { selectData } from '../../redux/select-data';
import {
  API_KEYS_REDUCER_KEY,
  WEB_API_KEYS_DATA_ENDPOINT,
  WEB_API_USER_DATA_ENDPOINT,
} from '../../redux/api-key/constants';
import { Script } from 'gatsby';
import { loadBoomerang } from 'src/third-party/boomerang';
import posthog from 'posthog-js';
import { loadHeadway } from 'src/third-party/headway';
import { sessionTracking } from './session-tracking';

const hubspotTrackingId = process.env.GATSBY_HUBSPOT_TRACKING_ID;
const boomerangEnabled = process.env.GATSBY_BOOMERANG_ENABLED;
const posthogApiKey = process.env.GATSBY_POSTHOG_API_KEY;
const headwayAccountId = process.env.GATSBY_HEADWAY_ACCOUNT_ID;
const googleTagManagerAuthToken = process.env.GATSBY_GOOGLE_TAG_MANAGER_AUTH_TOKEN;
const googleTagManagerPreview = process.env.GATSBY_GOOGLE_TAG_MANAGER_PREVIEW;

const gtmSnippet = `(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const f = d.getElementsByTagName(s)[0],
    j = d.createElement(s),
    dl = l != 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src =
    'https://www.googletagmanager.com/gtm.js?id=' +
    i +
    dl +
    '&gtm_auth=${googleTagManagerAuthToken}&gtm_preview=${googleTagManagerPreview}&gtm_cookies_win=x';
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-TZ37KKW');`;

const apiKeysInit = { data: [] };

const GlobalLoading: FC = ({ children }) => {
  const [sessionState, setSessionState] = useState<Record<string, string>>({});
  const [apiKeys, setApiKeys] = useState<{ data: UserApiKey[] }>(apiKeysInit);

  useEffect(() => {
    const store = getRemoteDataStore();

    if (posthogApiKey) {
      posthog.init(posthogApiKey, { api_host: 'https://app.posthog.com' });
    }

    loadSprites(sprites);

    connectState(selectSessionData, setSessionState);
    fetchSessionData(store, WEB_API_USER_DATA_ENDPOINT);

    connectState(selectData(API_KEYS_REDUCER_KEY), (state: { data?: UserApiKey[] }) => {
      if (Array.isArray(state?.data)) {
        return setApiKeys({ data: state.data });
      } else {
        setApiKeys(apiKeysInit);
      }
    });

    fetchApiKeyData(store, WEB_API_KEYS_DATA_ENDPOINT);
  }, []);

  useEffect(
    () =>
      sessionTracking(sessionState, {
        hubspot: !!hubspotTrackingId,
        posthog: !!posthogApiKey,
        googleTagManager: !!(googleTagManagerAuthToken && googleTagManagerPreview),
      }),
    [sessionState],
  );

  const userState: UserDetails = { sessionState, apiKeys };
  return (
    <UserContext.Provider value={userState}>
      {googleTagManagerAuthToken && googleTagManagerPreview ? (
        <>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=GTM-TZ37KKW&gtm_auth=${googleTagManagerAuthToken}&gtm_preview=${googleTagManagerPreview}&gtm_cookies_win=x`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <Script
            id="gtm-loader"
            dangerouslySetInnerHTML={{
              __html: gtmSnippet,
            }}
          />
        </>
      ) : null}
      {hubspotTrackingId ? <Script src={`//js.hs-scripts.com/${hubspotTrackingId}.js`} id="hs-script-loader" /> : null}
      {boomerangEnabled ? (
        <Script
          id="boomerang-loader"
          src="https://s3.amazonaws.com/assets.heroku.com/boomerang/boomerang.js"
          crossOrigin={'true'}
          onLoad={loadBoomerang(sessionState.heroku)}
        />
      ) : null}
      {headwayAccountId && sessionState.signedIn ? (
        <Script
          id="headway-loader"
          src="//cdn.headwayapp.co/widget.js"
          crossOrigin="true"
          onLoad={loadHeadway(headwayAccountId)}
        />
      ) : null}
      {children}
    </UserContext.Provider>
  );
};

export default GlobalLoading;
