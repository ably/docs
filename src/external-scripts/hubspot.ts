import Cookies from 'js-cookie';

import { scriptLoader } from './utils';

declare global {
  type HubspotItem = string | Record<string, string>;
  interface Window {
    _hsq: Array<string | Record<string, string>>[];
  }
}

export type AblyHubspotData = {
  identifyKey: string;
};

export type HubspotUser = {
  email: string;
  firstName: string;
  lastName: string;
  accountNameForCrm: string;
  id: string;
  adminUrl: string;
};

const hubspot = (hubspotTrackingId) => {
  scriptLoader(document, `//js.hs-scripts.com/${hubspotTrackingId}.js`, { id: 'hs-script-loader' });
  window._hsq = window._hsq || [];
};

export const hubspotIdentifyUser = ({
  emulatingUser,
  user,
  hubspot,
}: {
  emulatingUser?: boolean;
  user?: HubspotUser;
  hubspot?: AblyHubspotData;
}) => {
  if (!hubspot || !window) {
    return;
  }

  const identifyValue = Cookies.get(hubspot.identifyKey);
  const campaignEmail = Cookies.get('hubspot_campaign_email');

  if (campaignEmail) {
    window._hsq.push([
      'identify',
      {
        email: campaignEmail,
      },
    ]);
    _hsq.push(['trackPageView']);

    Cookies.set('hubspot_campaign_email', undefined);
  }

  if (!emulatingUser && user && identifyValue !== user.id && !campaignEmail) {
    window._hsq.push([
      'identify',
      {
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        company: user.accountNameForCrm,
        ably_id: user.id,
        ably_url: user.adminUrl,
      },
    ]);

    window._hsq.push(['trackPageView']);

    Cookies.set(hubspot.identifyKey, user.id);
  }
};

export default hubspot;
