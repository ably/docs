import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SessionDataProvider } from '@ably/ui/core/scripts';

import UserContext from './user-context';
import { UserContextWrapper } from './user-context/wrap-with-provider';
import { WEB_API_USER_DATA_ENDPOINT } from './user-context/api-keys';

test('UserContextWrapper publishes session and demo api keys via UserContext', async () => {
  render(
    <SessionDataProvider sessionDataUrl={WEB_API_USER_DATA_ENDPOINT}>
      <UserContextWrapper>
        <UserContext.Consumer>
          {({ sessionState, apps }) => (
            <>
              <div data-testid="session">{JSON.stringify(sessionState)}</div>
              <div data-testid="apps">{JSON.stringify(apps)}</div>
            </>
          )}
        </UserContext.Consumer>
      </UserContextWrapper>
    </SessionDataProvider>,
  );

  expect(await screen.findByText(/DEMO:API-KEY/)).toBeInTheDocument();
});
