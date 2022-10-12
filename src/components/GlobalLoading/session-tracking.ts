import { fireGoogleTagManager } from 'src/third-party/gtm/track-session';
import { AblyHubspotData, hubspotIdentifyUser, HubspotUser } from 'src/third-party/hubspot';
import { posthogIdentifyUser, posthogSetUserEmail } from 'src/third-party/posthog';

export type TrackableSession = {
  emulatingUser?: boolean;
  user?: HubspotUser;
  hubspot?: AblyHubspotData;
  pageVisitCount?: number;
  cookiesAcceptedByUser?: unknown;
  signedIn?: unknown;
};

type TrackingEnabled = {
  hubspot: boolean;
  googleTagManager: boolean;
  posthog: boolean;
};

export const sessionTracking = (sessionState: TrackableSession, trackingEnabled: TrackingEnabled) => {
  if (!sessionState) {
    return;
  }
  const { hubspot, googleTagManager, posthog } = trackingEnabled;

  if (hubspot) {
    hubspotIdentifyUser(sessionState);
  }

  if (googleTagManager) {
    fireGoogleTagManager(sessionState);
  }

  if (posthog && sessionState?.user?.id) {
    posthogIdentifyUser(sessionState.user.id);
    posthogSetUserEmail(sessionState.user.email);
  }
};
