import type { GatsbyBrowser } from 'gatsby';

import { reducerFlashes } from '@ably/ui/core/Flash';

import {
  attachStoreToWindow,
  createRemoteDataStore,
  reducerBlogPosts,
  reducerSessionData,
} from '@ably/ui/core/scripts';

import { reducerApiKeyData } from './src/redux/api-key/api-key-reducer';

const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  const store = createRemoteDataStore({
    ...reducerBlogPosts,
    ...reducerSessionData,
    ...reducerApiKeyData,
    ...reducerFlashes,
  });

  attachStoreToWindow(store);
};

/**
 *  The 'shouldUpdateScroll' function will fire when navigating to new pages within Gatsby
 */
const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = ({ prevRouterProps, routerProps: { location } }) => {
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

/**
 * Load our user state
 */
import UserContextWrapper from './src/contexts/user-context/wrap-with-provider';
const wrapRootElement = UserContextWrapper;

export { onClientEntry, shouldUpdateScroll, wrapRootElement };
