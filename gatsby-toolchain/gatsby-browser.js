import './src/styles/global.css';

import { reducerFlashes } from "@ably/ui/core/Flash";

import {
    loadSprites,
    createRemoteDataStore,
    attachStoreToWindow,
    reducerBlogPosts,
    reducerSessionData,
} from "@ably/ui/core/scripts";
  
import sprites from "@ably/ui/core/sprites.svg";
  
document.addEventListener("DOMContentLoaded", () => {
    // Inserts a sprite map for <use> tags
    loadSprites(sprites);
  
    // Create store before we render, the store is also added
    // to the global namespace
    const store = createRemoteDataStore({
      ...reducerBlogPosts,
      ...reducerSessionData,
      ...reducerFlashes,
    });
  
    attachStoreToWindow(store);
});

const smoothscroll = () => {

};

const versionRegex = /\/versions\/v\d+\.\d+/;
const languageRegex = /\/language\/\w+/;
const hashRegex = /(\/?#.*)$/;

const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps: { location },
}) => {
  if(!prevRouterProps || !location) {
    return false;
  }
  const curr = location.href;
  const prev =  prevRouterProps.location.href;

  const plainCurr = curr.replace(versionRegex,'').replace(languageRegex,'').replace(hashRegex, '');
  const plainPrev = prev.replace(versionRegex,'').replace(languageRegex,'').replace(hashRegex, '');

  return plainCurr !== plainPrev // If the current location is a variant of the previous location, do not update scroll
    && !(location.href.indexOf("#") > -1); // If we're going to a hash link on page B from page A, do not update scroll
};

export {
  shouldUpdateScroll
}