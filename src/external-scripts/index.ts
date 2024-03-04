import hubspot, { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from './hubspot';
import headway from './headway';
import boomerang from './boomerang';
import announcement from 'utilities/console-announcement';
import googleTagManager, {
  googleTagManagerCookiesAccepted,
  googleTagManagerSessionPageViews,
  googleTagManagerLoggedIn,
} from './google-tag-manager';

export type TrackableSession = {
  emulatingUser?: boolean;
  user?: HubspotUser;
  hubspot?: AblyHubspotData;
  pageVisitCount?: number;
  cookiesAcceptedByUser?: unknown;
  signedIn?: unknown;
};

// Inject scripts and run any init code
const injectScripts = ({ hubspotTrackingId, googleTagManagerAuthToken, gtmPreview, announcementEnabled } = {}) => {
  if (announcementEnabled) {
    announcement();
  }

  if (googleTagManagerAuthToken && gtmPreview) {
    googleTagManager(googleTagManagerAuthToken, gtmPreview);
  }

  if (hubspotTrackingId) {
    hubspot(hubspotTrackingId);
  }
};

// Run signed in trackers
const sessionTracker = (
  { hubspotTrackingId, googleTagManagerAuthToken, gtmPreview, headwayAccountId, boomerangEnabled } = {},
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
};

const externalScriptInjector = (externalScriptsData) => ({
  injectScripts: () => injectScripts(externalScriptsData),
  sessionTracker: (sessionData) => sessionTracker(externalScriptsData, sessionData),
});

export default externalScriptInjector;
