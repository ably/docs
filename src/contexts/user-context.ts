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
