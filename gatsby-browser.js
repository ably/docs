import './src/styles/global.css';

import { reducerFlashes } from '@ably/ui/core/Flash';

import {
  loadSprites,
  createRemoteDataStore,
  attachStoreToWindow,
  reducerBlogPosts,
  reducerSessionData,
} from '@ably/ui/core/scripts';

import sprites from '@ably/ui/core/sprites.svg';

const PAGE_OFFSET = 128;

const offsetScroll = () => window.scrollBy(0, -PAGE_OFFSET);

const onClientEntry = () => {
  // Inserts a sprite map for <use> tags
  loadSprites(sprites);

  const store = createRemoteDataStore({
    ...reducerBlogPosts,
    ...reducerSessionData,
    ...reducerFlashes,
  });

  attachStoreToWindow(store);
  window.addEventListener('hashchange', offsetScroll);
};

const versionRegex = /\/versions\/v\d+\.\d+/;
const languageRegex = /\?lang=\w+/;
const hashRegex = /(\/?#.*)$/;

/**
 *  The 'shouldUpdateScroll' function does not pertain to the offsetScroll event listener above
 *  `shouldUpdateScroll` is specific to Gatsby
 *  `offsetScroll` is a simple event listener with no dependencies (other than 'window')
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
