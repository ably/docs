import Cookies from 'js-cookie';
import hubspot, { hubspotIdentifyUser } from './hubspot';

const identifyKey = 'key';

describe('Hubspot', () => {
  beforeEach(() => {
    global._hsq = [];
    global.hsConversationsSettings = {};
    Cookies.set(identifyKey, undefined);
  });

  describe('hsConversationsSettings', () => {
    beforeEach(() => {
      document.body.innerHTML = `<script></script>`;
    });

    it('has correct defaults', () => {
      hubspot('trackingId');

      expect(global.hsConversationsSettings).toEqual({ loadImmediately: true });
    });

    it('uses the loadImmediately parameter', () => {
      hubspot('trackingId', false);

      expect(global.hsConversationsSettings).toEqual({ loadImmediately: false });
    });
  });

  describe('hubspotIdentifyUser', () => {
    it('does not run if emulatingUser flag is true', () => {
      const spy = jest.spyOn(global._hsq, 'push');

      hubspotIdentifyUser({ emulatingUser: true, hubspot: { identifyKey } });

      expect(spy).not.toHaveBeenCalled();
    });

    it('does not run if user id is saved in session', () => {
      const spy = jest.spyOn(global._hsq, 'push');
      Cookies.set(identifyKey, '1');

      hubspotIdentifyUser({ emulatingUser: false, hubspot: { identifyKey }, user: { id: '1' } });

      expect(spy).not.toHaveBeenCalled();
    });

    it('runs the tracking snippets', () => {
      const spy = jest.spyOn(global._hsq, 'push');
      const user = {
        email: 'bobby@tables.com',
        firstName: 'Bobby',
        lastName: 'Tables',
        accountNameForCrm: 'Injectorix',
        id: '1',
        adminUrl: 'https://ably.com/1/admin',
      };

      hubspotIdentifyUser({ emulatingUser: false, hubspot: { identifyKey }, user });

      expect(spy).toHaveBeenCalledWith([
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

      expect(spy).toHaveBeenCalledWith(['trackPageView']);
    });

    it('runs the tracking snippets for campaign users', () => {
      const spy = jest.spyOn(global._hsq, 'push');

      Cookies.set('hubspot_campaign_email', 'test@example.com');

      hubspotIdentifyUser({ emulatingUser: false, hubspot: { identifyKey } });

      expect(spy).toHaveBeenCalledWith([
        'identify',
        {
          email: 'test@example.com',
        },
      ]);

      expect(spy).toHaveBeenCalledWith(['trackPageView']);
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
