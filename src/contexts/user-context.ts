import { createContext } from 'react';

export type UserDetails = {
  sessionState: Record<string, unknown>;
  apiKeys: Record<string, unknown>;
};

const DEFAULT_USER_DETAILS: UserDetails = {
  sessionState: {},
  apiKeys: {},
};

const UserContext = createContext(DEFAULT_USER_DETAILS);

export default UserContext;
