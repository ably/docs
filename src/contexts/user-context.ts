import { createContext } from 'react';

export type UserDetails = {
  sessionState: Record<string, unknown>;
  apiKeys: Record<string, unknown>;
};

export const devApiKeysPresent = [
  {
    name: 'Default - Dev',
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
  apiKeys: {},
};

const UserContext = createContext(DEFAULT_USER_DETAILS);

export default UserContext;
