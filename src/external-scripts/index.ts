import hubspot, { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from './hubspot';
import headway from './headway';
import boomerang from './boomerang';
import type { BoomerangParams } from './boomerang';
import announcement from '../utilities/console-announcement';
import {
  googleTagManagerCookiesAccepted,
  googleTagManagerSessionPageViews,
  googleTagManagerLoggedIn,
} from './google-tag-manager';
import inkeepChat, { inkeepChatIdentifyUser, InkeepUser } from './inkeep';

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
  boomerangEnabled?: boolean;
  inkeepEnabled?: string;
  inkeepApiKey?: string;
  inkeepIntegrationId?: string;
  inkeepOrganizationId?: string;
};

type SessionState = {
  heroku?: BoomerangParams;
  signedIn?: boolean;
  pageVisitCount?: number;
  cookiesAcceptedByUser?: unknown;
  emulatingUser?: boolean;
  user?: HubspotUser & InkeepUser;
  hubspot?: AblyHubspotData;
};

// Inject scripts and run any init code
const injectScripts = ({
  hubspotTrackingId,
  announcementEnabled,
  inkeepEnabled,
  inkeepApiKey,
  inkeepIntegrationId,
  inkeepOrganizationId,
}: ExternalScriptsData = {}) => {
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
  }: ExternalScriptsData = {},
  sessionState: SessionState,
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
    if (sessionState.user) {
      inkeepChatIdentifyUser({ user: sessionState.user });
    }
  }
};

const externalScriptInjector = (externalScriptsData: ExternalScriptsData | undefined) => ({
  injectScripts: () => injectScripts(externalScriptsData),
  sessionTracker: (sessionData: SessionState) => sessionTracker(externalScriptsData, sessionData),
});

export default externalScriptInjector;
