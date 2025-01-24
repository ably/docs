import { safeWindow } from 'src/utilities';

export const googleTagManagerSessionPageViews = ({ pageVisitCount }: { pageVisitCount?: number }) =>
  safeWindow.dataLayer?.push({ sessionPageViews: pageVisitCount ?? 0 });

export const googleTagManagerLoggedIn = ({ signedIn }: { signedIn?: unknown }) =>
  !!signedIn && safeWindow.dataLayer?.push({ loggedIn: 'true' });

export const googleTagManagerCookiesAccepted = ({ cookiesAcceptedByUser }: { cookiesAcceptedByUser?: unknown }) =>
  !!cookiesAcceptedByUser && safeWindow.dataLayer?.push({ cookiesAccepted: 'true' });

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackPageView = ({ location }: { location: Location }) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'pageview',
    page: {
      path: location.pathname,
      url: window.location.href,
      title: document.title,
    },
  });
};
