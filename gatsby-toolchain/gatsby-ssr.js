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
