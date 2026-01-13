import React, { useEffect, useRef } from 'react';
import type { GatsbyBrowser } from 'gatsby';

import { reducerFlashes } from '@ably/ui/core/Flash';
import { initInsights, trackPageView, setupObserver } from '@ably/ui/core/insights';
import {
  attachStoreToWindow,
  createRemoteDataStore,
  reducerBlogPosts,
  reducerSessionData,
} from '@ably/ui/core/scripts';
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';

import { reducerApiKeyData } from './src/redux/api-key/api-key-reducer';
import UserContextWrapper from './src/contexts/user-context/wrap-with-provider';
import { useSiteMetadata } from './src/hooks/use-site-metadata';

const onClientEntry: GatsbyBrowser['onClientEntry'] = () => {
  setupObserver();

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

const InsightsWrapper = ({ children }) => {
  // Use a ref to track if we've already initialized
  const initialized = useRef(false);
  const { externalScriptsData } = useSiteMetadata();

  useEffect(() => {
    // Initialize insights only once
    if (!initialized.current) {
      initialized.current = true;

      initInsights({
        debug: externalScriptsData.insightsDebug,
        mixpanelToken: externalScriptsData.mixpanelApiKey,
        mixpanelAutoCapture: externalScriptsData.mixpanelAutoCapture,
        posthogApiKey: externalScriptsData.posthogApiKey,
        posthogApiHost: externalScriptsData.posthogHost,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};

export const wrapRootElement = ({ element }) => {
  return (
    <InsightsWrapper>
      <UserContextWrapper element={element} />
    </InsightsWrapper>
  );
};

export const onRouteUpdate = () => {
  trackPageView();
};

export { onClientEntry, shouldUpdateScroll };
