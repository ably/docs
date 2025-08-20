import hubspot, { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from './hubspot';
import headway from './headway';
import announcement from '../utilities/console-announcement';
import {
  googleTagManagerCookiesAccepted,
  googleTagManagerSessionPageViews,
  googleTagManagerLoggedIn,
} from './google-tag-manager';
import inkeepChat, { inkeepChatIdentifyUser } from './inkeep';
import type { SessionState } from '../contexts/user-context';
import { identifyUser } from './ably-insights';
import { intercomIdentifyUser, intercomSetup } from './intercom';

export type TrackableSession = {
  emulatingUser?: boolean;
  user?: HubspotUser;
  hubspot?: AblyHubspotData;
  pageVisitCount?: number;
  cookiesAcceptedByUser?: unknown;
  signedIn?: unknown;
};

type ExternalScriptsData = {
  hubspotTrackingId?: string;
  gtmContainerId?: string;
  announcementEnabled?: boolean;
  headwayAccountId?: string;
  inkeepChatEnabled?: boolean;
  inkeepSearchEnabled?: boolean;
  inkeepApiKey?: string;
  insightsEnabled?: boolean;
  conversationsUrl?: string;
  intercomEnabled?: boolean;
  intercomAppId?: string;
};

// Inject scripts and run any init code
const injectScripts = ({
  hubspotTrackingId,
  announcementEnabled,
  inkeepChatEnabled,
  inkeepSearchEnabled,
  inkeepApiKey,
  conversationsUrl,
  intercomEnabled,
  intercomAppId,
}: ExternalScriptsData = {}) => {
  if (announcementEnabled) {
    announcement();
  }

  if (hubspotTrackingId) {
    hubspot(hubspotTrackingId, !inkeepChatEnabled);
  }

  // Inkeep and Intercom should not be enabled at the same time
  if (inkeepChatEnabled && intercomEnabled) {
    console.warn('Inkeep and Intercom should not be enabled at the same time');
  }

  if ((inkeepChatEnabled || inkeepSearchEnabled) && inkeepApiKey) {
    inkeepChat(inkeepApiKey, conversationsUrl as '', inkeepChatEnabled || false, inkeepSearchEnabled || false);
  }

  if (intercomEnabled && intercomAppId) {
    intercomSetup(intercomAppId);
  }

  if (!document.querySelector('div[data-scripts-loaded="true"]')) {
    const scriptsLoadedMarker = document.createElement('div');
    scriptsLoadedMarker.setAttribute('data-scripts-loaded', 'true');
    document.body.appendChild(scriptsLoadedMarker);
  }
};

// Run signed in trackers
const sessionTracker = (
  {
    hubspotTrackingId,
    gtmContainerId,
    headwayAccountId,
    inkeepChatEnabled,
    inkeepSearchEnabled,
    inkeepApiKey,
    insightsEnabled,
    intercomEnabled,
  }: ExternalScriptsData = {},
  sessionState: SessionState,
) => {
  if (!sessionState) {
    return;
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

  if (inkeepChatEnabled && inkeepApiKey) {
    if (sessionState.user) {
      inkeepChatIdentifyUser({ user: sessionState.user });
    }
  }

  if (insightsEnabled && sessionState.signedIn) {
    identifyUser(sessionState);
  }

  if (intercomEnabled && sessionState.signedIn) {
    intercomIdentifyUser(sessionState);
  }
};

const externalScriptInjector = (externalScriptsData: ExternalScriptsData | undefined) => ({
  injectScripts: () => injectScripts(externalScriptsData),
  sessionTracker: (sessionData: SessionState) => sessionTracker(externalScriptsData, sessionData),
});

export default externalScriptInjector;
