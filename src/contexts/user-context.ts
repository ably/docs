import { createContext } from 'react';
import { type UserApiKey } from 'src/components/blocks/software/Code/ApiKeyMenu';

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

export type UserDetails = {
  sessionState: SessionState;
  apiKeys: {
    data: UserApiKey[];
  };
};

export const devApiKeysPresent = [
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
