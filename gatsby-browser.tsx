import React from 'react';
import './src/styles/global.css';

import { reducerFlashes } from '@ably/ui/core/Flash';

import { SidebarProvider } from './src/contexts/SidebarContext';

import {
  attachStoreToWindow,
  createRemoteDataStore,
  reducerBlogPosts,
  reducerSessionData,
} from '@ably/ui/core/scripts';

import { reducerApiKeyData } from './src/redux/api-key/api-key-reducer';

const onClientEntry = () => {
  const store = createRemoteDataStore({
    ...reducerBlogPosts,
    ...reducerSessionData,
    ...reducerApiKeyData,
    ...reducerFlashes,
  });

  attachStoreToWindow(store);
};

export const wrapRootElement = ({ element }) => {
  return <SidebarProvider>{element}</SidebarProvider>;
};

/**
 *  The 'shouldUpdateScroll' function will fire when navigating to new pages within Gatsby
 */
const shouldUpdateScroll = ({ prevRouterProps, routerProps: { location } }) => {
  if (!prevRouterProps || !location) {
    return false;
  }

  const curr = location.pathname;
  const prev = prevRouterProps.location.pathname;

  return (
    curr !== prev && // If the current location is a variant of the previous location, do not update scroll
    !(curr.indexOf('#') > -1) &&
    !(prev.indexOf('#') > -1) // If we're going to or from any hash link on page B from page A, do not update scroll; we want to visit the specific section
  );
};

export { onClientEntry, shouldUpdateScroll };
