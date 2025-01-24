import hubspot, { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from './hubspot';
import headway from './headway';
import boomerang from './boomerang';
import announcement from 'utilities/console-announcement';
import {
  googleTagManagerCookiesAccepted,
  googleTagManagerSessionPageViews,
  googleTagManagerLoggedIn,
} from './google-tag-manager';
import oneTrustScript from './one-trust';
import inkeepChat, { inkeepChatIdentifyUser } from './inkeep';

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
  announcementEnabled,
  oneTrustDomain,
  oneTrustEnabled,
  oneTrustTest,
  inkeepEnabled,
  inkeepApiKey,
  inkeepIntegrationId,
  inkeepOrganizationId,
} = {}) => {
  if (oneTrustEnabled) {
    oneTrustScript(oneTrustDomain, oneTrustTest);
  }

  if (announcementEnabled) {
    announcement();
  }

  if (hubspotTrackingId) {
    hubspot(hubspotTrackingId, !(inkeepEnabled === 'true'));
  }

  if (inkeepEnabled) {
    inkeepChat(inkeepApiKey, inkeepIntegrationId, inkeepOrganizationId);
  }
};

// Run signed in trackers
const sessionTracker = (
  {
    hubspotTrackingId,
    gtmContainerId,
    headwayAccountId,
    boomerangEnabled,
    inkeepEnabled,
    inkeepApiKey,
  } = {},
  sessionState,
) => {
  if (!sessionState) {
    return;
  }

  if (boomerangEnabled && sessionState.heroku) {
    boomerang(sessionState.heroku);
  }

  if (gtmContainerId) {
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

  if (inkeepEnabled && inkeepApiKey) {
    inkeepChatIdentifyUser(sessionState);
  }
};

const externalScriptInjector = (externalScriptsData) => ({
  injectScripts: () => injectScripts(externalScriptsData),
  sessionTracker: (sessionData) => sessionTracker(externalScriptsData, sessionData),
});

export default externalScriptInjector;
