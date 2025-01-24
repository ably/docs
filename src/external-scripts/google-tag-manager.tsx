import { safeWindow } from 'src/utilities';

const buildGtmUrl = (baseUrl: string, params: { [key: string]: string | undefined }) => {
  const validParams = Object.entries(params)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return validParams ? `${baseUrl}?${validParams}` : baseUrl;
};

const googleTagManager = (containerId?: string, authToken?: string, preview?: string) => {
  if (!containerId) {
    return;
  }

  safeWindow.dataLayer ??= [];
  safeWindow.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  const firstScript = document.getElementsByTagName('script')[0];
  const script = document.createElement('script');
  script.async = true;
  script.src = buildGtmUrl('https://www.googletagmanager.com/gtag/js', {
    id: containerId,
    gtm_auth: authToken,
    gtm_preview: preview,
    gtm_cookies_win: 'x',
  });
  firstScript.parentNode?.insertBefore(script, firstScript);
};

export const GoogleTagManagerFallback = ({
  containerId,
  authToken,
  preview,
}: {
  containerId?: string;
  authToken?: string;
  preview?: string;
}) => {
  if (!containerId || !authToken || !preview) {
    return null;
  }

  const iframeSrc = buildGtmUrl('https://www.googletagmanager.com/ns.html', {
    id: containerId,
    gtm_auth: authToken,
    gtm_preview: preview,
    gtm_cookies_win: 'x',
  });

  return (
    <noscript>
      <iframe src={iframeSrc} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
    </noscript>
  );
};

export const trackPageView = (location: Location) => {
  safeWindow.dataLayer?.push({
    event: 'pageview',
    page: {
      path: location.pathname,
      url: window.location.href,
    },
  });
};

const googleTagManagerSessionPageViews = ({ pageVisitCount }: { pageVisitCount?: number }) =>
  safeWindow.dataLayer?.push({ sessionPageViews: pageVisitCount ?? 0 });

const googleTagManagerLoggedIn = ({ signedIn }: { signedIn?: unknown }) =>
  !!signedIn && safeWindow.dataLayer?.push({ loggedIn: 'true' });

const googleTagManagerCookiesAccepted = ({ cookiesAcceptedByUser }: { cookiesAcceptedByUser?: unknown }) =>
  !!cookiesAcceptedByUser && safeWindow.dataLayer?.push({ cookiesAccepted: 'true' });

export { googleTagManagerSessionPageViews, googleTagManagerLoggedIn, googleTagManagerCookiesAccepted };
export default googleTagManager;
