import { TrackableSession } from 'src/components/GlobalLoading/session-tracking';
import { safeWindow } from 'src/utilities';

const googleTagManagerSessionPageViews = ({ pageVisitCount }: { pageVisitCount?: number }) =>
  safeWindow.dataLayer?.push({ sessionPageViews: pageVisitCount ?? 0 });

const googleTagManagerLoggedIn = ({ signedIn }: { signedIn?: unknown }) =>
  !!signedIn && safeWindow.dataLayer?.push({ loggedIn: 'true' });

const googleTagManagerCookiesAccepted = ({ cookiesAcceptedByUser }: { cookiesAcceptedByUser?: unknown }) =>
  !!cookiesAcceptedByUser && safeWindow.dataLayer?.push({ cookiesAccepted: 'true' });

export const fireGoogleTagManager = (sessionState: TrackableSession) => {
  googleTagManagerSessionPageViews(sessionState);
  googleTagManagerLoggedIn(sessionState);
  googleTagManagerCookiesAccepted(sessionState);
};
