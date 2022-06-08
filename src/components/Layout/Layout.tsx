import React, { FunctionComponent as FC, useEffect, useState } from 'react';
import Header from '../Header';
// Session-related scripts
import '@ably/ui/core/scripts';
import { connectState, selectSessionData, fetchSessionData, getRemoteDataStore } from '@ably/ui/core/scripts';
import SessionStateContext from '../../contexts/session-state-context';

const Layout: FC<{ languages: Array<string> }> = ({ languages, children }) => {
  const [sessionState, setSessionState] = useState({});

  useEffect(() => {
    connectState(selectSessionData, setSessionState);

    const store = getRemoteDataStore();

    fetchSessionData(store, 'https://ably.com/api/me');
  }, []);

  return (
    <SessionStateContext.Provider value={sessionState}>
      <header>
        <Header languages={languages} />
      </header>
      <main className={`${languages && languages.length > 1 ? 'pt-128' : 'pt-96'} grid grid-cols-5`}>{children}</main>
    </SessionStateContext.Provider>
  );
};

export default Layout;
