import hubspot, { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from './hubspot';
import headway from './headway';
import boomerang from './boomerang';
import announcement from '../utilities/console-announcement';
import googleTagManager, {
  googleTagManagerCookiesAccepted,
  googleTagManagerSessionPageViews,
  googleTagManagerLoggedIn,
} from './google-tag-manager';
import oneTrustScript from './one-trust';
import inkeepChat, { inkeepChatIdentifyUser, InkeepUser } from './inkeep';

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
  gtmContainerId,
  gtmAuthToken,
  gtmPreview,
  announcementEnabled,
  oneTrustDomain,
  oneTrustEnabled,
  oneTrustTest,
  inkeepEnabled,
  inkeepApiKey,
  inkeepIntegrationId,
  inkeepOrganizationId,
}: {
  hubspotTrackingId?: string;
  gtmContainerId?: string;
  gtmAuthToken?: string;
  gtmPreview?: string;
  announcementEnabled?: boolean;
  oneTrustDomain?: string;
  oneTrustEnabled?: boolean;
  oneTrustTest?: boolean;
  inkeepEnabled?: string;
  inkeepApiKey?: string;
  inkeepIntegrationId?: string;
  inkeepOrganizationId?: string;
} = {}) => {
  if (oneTrustEnabled) {
    oneTrustScript(oneTrustDomain, oneTrustTest);
  }

  if (announcementEnabled) {
    announcement();
  }

  if (gtmContainerId) {
    googleTagManager(gtmContainerId, gtmAuthToken, gtmPreview);
  }

  if (hubspotTrackingId) {
    hubspot(hubspotTrackingId, !(inkeepEnabled === 'true'));
  }

  if (inkeepEnabled) {
    inkeepChat(inkeepApiKey, inkeepIntegrationId, inkeepOrganizationId);
  }
};

// Run signed in trackers
type SessionTrackerParams = {
  hubspotTrackingId?: string;
  gtmContainerId?: string;
  headwayAccountId?: string;
  boomerangEnabled?: boolean;
  inkeepEnabled?: string;
  inkeepApiKey?: string;
};

const sessionTracker = (
  {
    hubspotTrackingId,
    gtmContainerId,
    headwayAccountId,
    boomerangEnabled,
    inkeepEnabled,
    inkeepApiKey,
  }: SessionTrackerParams = {},
  sessionState: {
    heroku?: any;
    signedIn?: any;
    pageVisitCount?: number | undefined;
    cookiesAcceptedByUser?: unknown;
    emulatingUser?: boolean | undefined;
    user?: HubspotUser | undefined;
    hubspot?: AblyHubspotData | undefined;
  },
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
    if (sessionState.user && 'uuid' in sessionState.user) {
      inkeepChatIdentifyUser({ user: sessionState.user as InkeepUser });
    }
  }
};

const externalScriptInjector = (
  externalScriptsData:
    | {
        hubspotTrackingId?: string;
        gtmContainerId?: string;
        gtmAuthToken?: string;
        gtmPreview?: string;
        announcementEnabled?: boolean;
        oneTrustDomain?: string;
        oneTrustEnabled?: boolean;
        oneTrustTest?: boolean;
        inkeepEnabled?: string;
        inkeepApiKey?: string;
        inkeepIntegrationId?: string;
        inkeepOrganizationId?: string;
      }
    | SessionTrackerParams
    | undefined,
) => ({
  injectScripts: () => injectScripts(externalScriptsData),
  sessionTracker: (sessionData: {
    heroku?: any;
    signedIn?: any;
    pageVisitCount?: number | undefined;
    cookiesAcceptedByUser?: unknown;
    emulatingUser?: boolean | undefined;
    user?: HubspotUser | undefined;
    hubspot?: AblyHubspotData | undefined;
  }) => sessionTracker(externalScriptsData, sessionData),
});

export default externalScriptInjector;
