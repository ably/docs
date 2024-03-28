import { safeWindow } from 'src/utilities';

const googleTagManager = (googleTagManagerAuthToken, gtmPreview) =>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src =
      'https://www.googletagmanager.com/gtm.js?id=' +
      i +
      dl +
      `&gtm_auth=${googleTagManagerAuthToken}&gtm_preview=${gtmPreview}&gtm_cookies_win=x`;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-TZ37KKW');

const googleTagManagerSessionPageViews = ({ pageVisitCount }: { pageVisitCount?: number }) =>
  safeWindow.dataLayer?.push({ sessionPageViews: pageVisitCount ?? 0 });

const googleTagManagerLoggedIn = ({ signedIn }: { signedIn?: unknown }) =>
  !!signedIn && safeWindow.dataLayer?.push({ loggedIn: 'true' });

const googleTagManagerCookiesAccepted = ({ cookiesAcceptedByUser }: { cookiesAcceptedByUser?: unknown }) =>
  !!cookiesAcceptedByUser && safeWindow.dataLayer?.push({ cookiesAccepted: 'true' });

export { googleTagManagerSessionPageViews, googleTagManagerLoggedIn, googleTagManagerCookiesAccepted };
export default googleTagManager;
