import { identify } from '@ably/ui/core/insights';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

interface Account {
  id: string;
}

interface Organization {
  id: string;
}

export interface SessionData {
  user: User;
  account: Account;
  organization: Organization;
}

export const identifyUser = (sessionData: SessionData): void => {
  const { user, account, organization } = sessionData;

  identify({
    userId: user.id,
    accountId: account.id,
    organisationId: organization?.id,
    // Leaving out PII
    email: '', // user.email,
    name: '', // [user.firstName, user.lastName].filter(Boolean).join(' '),
  });
};
