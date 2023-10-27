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

export type UserApiKey = {
  name: string;
  url: string;
  apiKeys: AppApiKey[];
};

export type UserDetails = {
  sessionState: SessionState;
  apiKeys: {
    data: UserApiKey[];
  };
};

export const devApiKeysPresent: UserApiKey[] = [
  {
    name: 'Default - Dev',
    url: '',
    apiKeys: [
      {
        id: 'dev_root_id',
        name: 'Root',
        capability: {
          '[*]*': [
            'channel-metadata',
            'history',
            'presence',
            'publish',
            'push-admin',
            'push-subscribe',
            'statistics',
            'subscribe',
          ],
        },
        whole_key: 'dev_api_key',
        created: '31 May 2022',
        paas_linked: false,
        webhook_url: '',
        is_webhook: false,
        ui_compatible_capabilities: true,
        revocableTokens: false,
      },
      {
        id: 'dev_subscribe_id',
        name: 'Subscribe only',
        capability: { '*': ['subscribe'] },
        whole_key: 'dev_api_key_subscribe',
        created: '31 May 2022',
        paas_linked: false,
        webhook_url: '',
        is_webhook: false,
        ui_compatible_capabilities: true,
        revocableTokens: false,
      },
    ],
  },
];

const DEFAULT_USER_DETAILS: UserDetails = {
  sessionState: {},
  apiKeys: {
    data: [],
  },
};

const UserContext = createContext(DEFAULT_USER_DETAILS);

export default UserContext;
