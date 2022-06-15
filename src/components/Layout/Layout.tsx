import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import Header from '../Header';
// Session-related scripts
import '@ably/ui/core/scripts';
import { connectState, selectSessionData, fetchSessionData, getRemoteDataStore } from '@ably/ui/core/scripts';
import UserContext, { UserDetails } from '../../contexts/user-context';
import { fetchApiKeyData } from '../../redux/api-key';
import { selectData } from '../../redux/select-data';
import {
  API_KEYS_REDUCER_KEY,
  WEB_API_KEYS_DATA_ENDPOINT,
  WEB_API_USER_DATA_ENDPOINT,
} from '../../redux/api-key/constants';
import { Script } from 'gatsby';

const Layout: FC<{ languages: Array<string> }> = ({ languages, children }) => {
  const [sessionState, setSessionState] = useState({});
  const [apiKeys, setApiKeys] = useState({});

  useEffect(() => {
    const store = getRemoteDataStore();

    connectState(selectSessionData, setSessionState);
    fetchSessionData(store, WEB_API_USER_DATA_ENDPOINT);

    connectState(selectData(API_KEYS_REDUCER_KEY), setApiKeys);
    fetchApiKeyData(store, WEB_API_KEYS_DATA_ENDPOINT);
  }, []);

  const userState: UserDetails = { sessionState, apiKeys };
  return (
    <UserContext.Provider value={userState}>
      <header>
        <Header languages={languages} />
      </header>
      <Script src="//cdn.ably.io/lib/ably.min-1.js"></Script>
      <Script id="example-id" strategy="idle">{`function subscribeToCurlRequest(key) {
  var ably = new Ably.Realtime(key),
      channelName = '{{RANDOM_CHANNEL_NAME}}';
  if (channelName === '{{RANDOM_CHANNEL' + '_NAME}}') { channelName = window.randomChannelName; }
  ably.channels.get(channelName).subscribe('greeting', function(message) {
    alert('That was easy, a message was just received from the REST API on channel "' + channelName + '".\n\nGreeting => ' + message.data);
  });
}

/* API_KEY variable is replaced inline on https://ably.com so
  {{API_KEY}} will not equal '{{API_' + 'KEY}}'
  On docs.ably.com, we rely on application.js to call the onApiKeyRetrieved method */
if ('Xocypw.AryGDdgU9SDnBf6qocYm7kZzzGTTY5fqzwQMiZOGGW1G79LmGk' !== '{{API_' + 'KEY}}') {
  subscribeToCurlRequest('Xocypw.AryGDdgU9SDnBf6qocYm7kZzzGTTY5fqzwQMiZOGGW1G79LmGk');
} else {
  window.onApiKeyRetrieved = subscribeToCurlRequest;
}`}</Script>
      <main className={`${languages && languages.length > 1 ? 'pt-128' : 'pt-96'} grid grid-cols-5`}>{children}</main>
    </UserContext.Provider>
  );
};

export default Layout;
