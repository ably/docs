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
import { replace } from 'lodash';
  
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

const versionRegex = /\/versions\/v\d+\.\d+/;
const languageRegex = /\/language\/\w+/;

const shouldUpdateScroll = ({
  prevRouterProps,
  routerProps: { location },
}) => {
  if(!prevRouterProps || !location) {
    return false;
  }
  const curr = location.href;
  const prev =  prevRouterProps.location.href;

  const plainCurr = curr.replace(versionRegex,'').replace(languageRegex,'');
  const plainPrev = prev.replace(versionRegex,'').replace(languageRegex,'');

  return plainCurr !== plainPrev;
};

export {
  shouldUpdateScroll
}