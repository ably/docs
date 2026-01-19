import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  sendDefaultPii: true,

  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.01,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  // These are backends we control because we need to be able to control (or influence) the CORS
  // headers at the remote server or things will break. It is also important to stick to using
  // regular expressions here, as string values are treated as simple substring matches which can
  // result in false positives and breakages in the browser, ie: `changelog.ably.com` would match
  // `ably.com` and result in a CORS issue for our users.
  tracePropagationTargets: [
    /^https:\/\/ably\.com\//,
    /^https:\/\/ably-dev\.com\//,
    /^http:\/\/localhost(:\d+)?\//,
    /^https?:\/\/ably\.test\//,
  ],
});

// Export hook for router transition tracking
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
