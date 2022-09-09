import './src/styles/global.css';

import { reducerFlashes } from '@ably/ui/core/Flash';

import {
  createRemoteDataStore,
  attachStoreToWindow,
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

const versionRegex = /\/versions\/v\d+\.\d+/;
const languageRegex = /\?lang=\w+/;
const hashRegex = /(\/?#.*)$/;

/**
 *  The 'shouldUpdateScroll' function will fire when navigating to new pages within Gatsby
 */
const shouldUpdateScroll = ({ prevRouterProps, routerProps: { location } }) => {
  if (!prevRouterProps || !location) {
    return false;
  }
  const curr = location.href;
  const prev = prevRouterProps.location.href;

  const plainCurr = curr.replace(versionRegex, '').replace(languageRegex, '').replace(hashRegex, '');
  const plainPrev = prev.replace(versionRegex, '').replace(languageRegex, '').replace(hashRegex, '');

  return (
    plainCurr !== plainPrev && // If the current location is a variant of the previous location, do not update scroll
    !(curr.indexOf('#') > -1) &&
    !(prev.indexOf('#') > -1) // If we're going to or from any hash link on page B from page A, do not update scroll; we want to visit the specific section
  );
};

export { onClientEntry, shouldUpdateScroll };
