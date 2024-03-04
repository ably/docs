import hubspot, { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from './hubspot';
import headway from './headway';
import boomerang from './boomerang';
import announcement from 'utilities/console-announcement';
import googleTagManager, {
  googleTagManagerCookiesAccepted,
  googleTagManagerSessionPageViews,
  googleTagManagerLoggedIn,
} from './google-tag-manager';
import posthogSetup, { posthogIdentifyUser, posthogSetUserEmail } from './posthog';

export type TrackableSession = {
  emulatingUser?: boolean;
  user?: HubspotUser;
  hubspot?: AblyHubspotData;
  pageVisitCount?: number;
  cookiesAcceptedByUser?: unknown;
  signedIn?: unknown;
};

// Inject scripts and run any init code
const injectScripts = ({
  hubspotTrackingId,
  googleTagManagerAuthToken,
  gtmPreview,
  announcementEnabled,
  posthogApiKey,
} = {}) => {
  if (announcementEnabled) {
    announcement();
  }

  if (googleTagManagerAuthToken && gtmPreview) {
    googleTagManager(googleTagManagerAuthToken, gtmPreview);
  }

  if (hubspotTrackingId) {
    hubspot(hubspotTrackingId);
  }

  if (posthogApiKey) {
    posthogSetup(posthogApiKey);
  }
};

// Run signed in trackers
const sessionTracker = (
  { hubspotTrackingId, googleTagManagerAuthToken, gtmPreview, headwayAccountId, boomerangEnabled, posthogApiKey } = {},
  sessionState,
) => {
  if (!sessionState) {
    return;
  }

  if (boomerangEnabled && sessionState.heroku) {
    boomerang(sessionState.heroku);
  }

  if (googleTagManagerAuthToken && gtmPreview) {
    googleTagManagerSessionPageViews(sessionState);
    googleTagManagerLoggedIn(sessionState);
    googleTagManagerCookiesAccepted(sessionState);
  }

  if (hubspotTrackingId) {
    hubspotIdentifyUser(sessionState);
  }

  if (headwayAccountId && sessionState.signedIn) {
    headway(headwayAccountId);
  }

  if (posthogApiKey && sessionState?.user?.id) {
    const {
      user: { id, email },
    } = sessionState;
    posthogIdentifyUser(id);
    posthogSetUserEmail(email);
  }
};

const externalScriptInjector = (externalScriptsData) => ({
  injectScripts: () => injectScripts(externalScriptsData),
  sessionTracker: (sessionData) => sessionTracker(externalScriptsData, sessionData),
});

export default externalScriptInjector;
