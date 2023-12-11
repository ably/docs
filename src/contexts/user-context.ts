import { createContext } from 'react';

export type Link = {
  href: string;
  text: string;
};

type Account = {
  links: {
    dashboard: Link;
    [key: string]: Link;
  };
};

export type SessionState = {
  signedIn?: boolean;
  accountName?: string;
  preferredEmail?: string;
  account?: Account;
  mySettings?: Link;
  myAccessTokens?: Link;
  logOut?: {
    token: string;
    href: string;
    text: string;
  };
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
