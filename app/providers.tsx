'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { PostHogProvider } from 'posthog-js/react';
import posthog from 'posthog-js';
import { initInsights, setupObserver } from '@ably/ui/core/insights';
import { UserContextProvider } from '@/lib/user-context';
import { externalScriptsData } from '@/lib/site-config';

function InsightsProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      // Setup observer for insights
      setupObserver();

      // Initialize insights
      if (externalScriptsData.insightsEnabled) {
        initInsights({
          debug: externalScriptsData.insightsDebug,
          mixpanelToken: externalScriptsData.mixpanelApiKey,
          mixpanelAutoCapture: externalScriptsData.mixpanelAutoCapture,
          posthogApiKey: externalScriptsData.posthogApiKey,
          posthogApiHost: externalScriptsData.posthogHost,
        });
      }
    }
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <InsightsProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </InsightsProvider>
  );
}
