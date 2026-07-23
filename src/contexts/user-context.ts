import { createContext } from 'react';
import type { AblyHubspotData, HubspotUser } from '../external-scripts/hubspot';
import type { InkeepUser } from '../external-scripts/inkeep';
import type { SessionData } from '../external-scripts/ably-insights';

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
  user?: User & HubspotUser & InkeepUser;
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
  hubspot?: AblyHubspotData;
} & SessionData;

// Only the two fields the docs site actually reads. The upstream endpoint
// returns more, but the api-key fetcher narrows down to this pair before
// publishing to UserContext.
export interface AppApiKey {
  name: string;
  whole_key: string;
}

export type App = {
  name: string;
  url: string;
  apiKeys: AppApiKey[];
  demo: boolean;
};

export type UserDetails = {
  sessionState: SessionState;
  apps: App[];
};

const DEFAULT_USER_DETAILS: UserDetails = {
  sessionState: {},
  apps: [],
};

const UserContext = createContext(DEFAULT_USER_DETAILS);

export default UserContext;
