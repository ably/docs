import React, { useEffect, useMemo, useState } from 'react';
import { SessionDataProvider, useSessionData } from '@ably/ui/core/scripts';

import UserContext, { UserDetails, type App, SessionState } from '../user-context';
import { fetchApps, WEB_API_USER_DATA_ENDPOINT } from './api-keys';

//
// This wrapper component is responsible for loading up our user session and
// user/demo API keys and making both available via UserContext. Session data
// comes from SessionDataProvider (SWR-backed) in @ably/ui; API keys are
// fetched directly because the shape is docs-specific.
//
export const UserContextWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { sessionData } = useSessionData();
  const [apps, setApps] = useState<App[]>([]);

  useEffect(() => {
    let cancelled = false;
    const loadApps = async () => {
      try {
        const next = await fetchApps();
        if (!cancelled) {
          setApps(next);
        }
      } catch (e) {
        console.warn('Could not load api keys:', e);
      }
    };
    void loadApps();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<UserDetails>(
    () => ({
      sessionState: (sessionData ?? {}) as unknown as SessionState,
      apps,
    }),
    [sessionData, apps],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <SessionDataProvider sessionDataUrl={WEB_API_USER_DATA_ENDPOINT}>
    <UserContextWrapper>{element}</UserContextWrapper>
  </SessionDataProvider>
);

export default wrapRootElement;
