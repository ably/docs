import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserContext from './user-context';
import { UserContextWrapper } from './user-context/wrap-with-provider';

import { createRemoteDataStore, attachStoreToWindow, reducerSessionData } from '@ably/ui/core/scripts';

import { reducerApiKeyData } from 'src/redux/api-key/api-key-reducer';

const onClientEntry = () => {
  const store = createRemoteDataStore({
    ...reducerSessionData,
    ...reducerApiKeyData,
  });

  attachStoreToWindow(store);
};

/**
 * This test is disabled until we can see the issue below being resolved in
 * msw.
 *
 * https://github.com/mswjs/msw/issues/1785
 */
// eslint-disable-next-line jest/no-disabled-tests
test.skip('<UserContextWrapper />', async () => {
  onClientEntry();

  render(
    <UserContextWrapper>
      <UserContext.Consumer>
        {({ sessionState, apiKeys }) => {
          return (
            <>
              <div data-testid="session">{JSON.stringify(sessionState)}</div>
              <div data-testid="api-keys">{JSON.stringify(apiKeys)}</div>
            </>
          );
        }}
      </UserContext.Consumer>
    </UserContextWrapper>,
  );

  expect(await screen.getByText('DEMO:API-KEY G')).toBeInTheDocument();
});
