'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

// Types from the existing user-context
export type Link = {
  href: string;
  text: string;
};

type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  uuid: string;
};

type Account = {
  id: string;
  name: string;
  links: {
    dashboard: Link;
    [key: string]: Link;
  };
};

type Organization = {
  id: string;
  name: string;
};

export type SessionState = {
  signedIn?: boolean;
  accountName?: string;
  preferredEmail?: string;
  user?: User;
  account?: Account;
  organization?: Organization;
  mySettings?: Link;
  myAccessTokens?: Link;
  logOut?: {
    token: string;
    href: string;
    text: string;
  };
  pageVisitCount?: number;
  cookiesAcceptedByUser?: unknown;
  emulatingUser?: boolean;
};

type WildcardCapability = Record<string, string[]>;

export type AppApiKey = {
  ui_compatible_capabilities: boolean;
  capability: WildcardCapability;
  revocableTokens: boolean;
  paas_linked: boolean;
  is_webhook: boolean;
  webhook_url: string;
  whole_key: string;
  created: string;
  name: string;
  id: string;
};

export type App = {
  name: string;
  url: string;
  apiKeys: AppApiKey[];
  demo: boolean;
};

export type UserDetails = {
  sessionState: SessionState;
  apps: App[];
  loading: boolean;
};

// API endpoints
const WEB_API = process.env.NEXT_PUBLIC_ABLY_MAIN_WEBSITE || 'https://ably.com';
const WEB_API_USER_DATA_ENDPOINT = `${WEB_API}/api/me`;
const WEB_API_KEYS_DATA_ENDPOINT = `${WEB_API}/api/api_keys`;
const WEB_API_TEMP_KEY_ENDPOINT = `${WEB_API}/ably-auth/api-key/docs`;

const DEFAULT_USER_DETAILS: UserDetails = {
  sessionState: {},
  apps: [],
  loading: true,
};

const UserContext = createContext<UserDetails>(DEFAULT_USER_DETAILS);

/**
 * Fetch with credentials and handle CORS
 */
async function fetchWithCredentials<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

/**
 * Fetch demo API key from the temp key endpoint
 */
async function fetchDemoKey(): Promise<App | null> {
  try {
    const response = await fetch(WEB_API_TEMP_KEY_ENDPOINT, {
      credentials: 'include',
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Return as a demo app structure
    return {
      name: 'Demo',
      url: '',
      demo: true,
      apiKeys: [
        {
          whole_key: data.token || data.key || data,
          name: 'demo',
          id: 'demo',
          ui_compatible_capabilities: true,
          capability: { '*': ['*'] },
          revocableTokens: false,
          paas_linked: false,
          is_webhook: false,
          webhook_url: '',
          created: new Date().toISOString(),
        },
      ],
    };
  } catch (error) {
    console.error('Failed to fetch demo key:', error);
    return null;
  }
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userState, setUserState] = useState<UserDetails>(DEFAULT_USER_DETAILS);

  const loadUserData = useCallback(async () => {
    // Fetch session data
    const sessionData = await fetchWithCredentials<SessionState>(WEB_API_USER_DATA_ENDPOINT);

    if (sessionData?.signedIn) {
      // User is signed in, fetch their API keys
      const apiKeysData = await fetchWithCredentials<App[]>(WEB_API_KEYS_DATA_ENDPOINT);

      setUserState({
        sessionState: sessionData,
        apps: apiKeysData || [],
        loading: false,
      });
    } else {
      // User is not signed in, get a demo key
      const demoApp = await fetchDemoKey();

      setUserState({
        sessionState: sessionData || {},
        apps: demoApp ? [demoApp] : [],
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserContextProvider');
  }
  return context;
}

/**
 * Get API key from user data
 * @param userData - User details from context
 * @param demoOnly - If true, only return demo key
 */
export function getApiKey(userData: UserDetails, demoOnly = false): string | undefined {
  // Check for development key first
  if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_ABLY_KEY) {
    return process.env.NEXT_PUBLIC_ABLY_KEY;
  }

  const apps = userData.apps ?? [];
  const app = apps.find((a) => a.demo === demoOnly);
  return app?.apiKeys?.[0]?.whole_key;
}

/**
 * Get API keys formatted for CodeSnippet component
 */
export function getApiKeysForCodeSnippet(
  userData: UserDetails,
): Array<{ app: string; keys: Array<{ name: string; key: string }> }> {
  const apps = userData.apps && userData.apps.length > 0 && userData.apps[0].apiKeys.length > 0 ? userData.apps : [];

  // Check if there are any non-demo apps
  const hasNonDemo = apps.some(({ demo }) => !demo);
  const filteredApps = hasNonDemo ? apps.filter(({ demo }) => !demo) : apps;

  return filteredApps.length > 0
    ? filteredApps.map(({ name, apiKeys, demo }) => ({
        app: demo ? 'demo' : name,
        keys: apiKeys.map((apiKey) => ({ name: apiKey.name, key: apiKey.whole_key })),
      }))
    : [{ app: 'demo', keys: [{ name: 'demo', key: 'demokey:123456' }] }];
}

export default UserContext;
