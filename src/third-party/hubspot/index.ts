import Cookies from 'js-cookie';

declare global {
  type HubspotItem = string | Record<string, string>;
  interface Window {
    _hsq: Array<string | Record<string, string>>[];
  }
}

type AblyHubspotData = {
  identifyKey: string;
};

type HubspotUser = {
  email: string;
  firstName: string;
  lastName: string;
  accountNameForCrm: string;
  id: string;
  adminUrl: string;
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
  if (!window._hsq) {
    window._hsq = [];
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
    window._hsq.push(['trackPageView']);

    Cookies.remove('hubspot_campaign_email');
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
