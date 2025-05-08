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

  describe('openFromMetaTag', () => {
    beforeEach(() => {
      document.head.innerHTML = '';
      jest.spyOn(window.history, 'pushState').mockImplementation();
      global.window.HubSpotConversations = {
        widget: {
          load: jest.fn(),
          open: jest.fn(),
        },
      };
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('opens chat widget when conversation meta tag exists', () => {
      // Add a meta tag to the document
      const metaTag = document.createElement('meta');
      metaTag.name = 'conversation';
      metaTag.content = 'sales';
      document.head.appendChild(metaTag);

      hubspot('12345');

      // Simulate the HubSpot script loading by calling the registered callback
      global.hsConversationsOnReady[0]();

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '?chat-type=sales');
      expect(global.window.HubSpotConversations.widget.load).toHaveBeenCalled();
      expect(global.window.HubSpotConversations.widget.open).toHaveBeenCalled();
    });

    it('does not open chat widget when no conversation meta tag exists', () => {
      document.head.innerHTML = '<meta name="other-tag" content="something">';

      hubspot('12345');

      // Simulate the HubSpot script loading
      global.hsConversationsOnReady[0]();

      expect(window.history.pushState).not.toHaveBeenCalled();
      expect(global.window.HubSpotConversations.widget.load).not.toHaveBeenCalled();
      expect(global.window.HubSpotConversations.widget.open).not.toHaveBeenCalled();
    });

    it('correctly sets URL query parameter from meta tag content', () => {
      const metaTag = document.createElement('meta');
      metaTag.name = 'conversation';
      metaTag.content = 'support';
      document.head.appendChild(metaTag);

      hubspot('12345');

      // Simulate the HubSpot script loading
      global.hsConversationsOnReady[0]();

      expect(window.history.pushState).toHaveBeenCalledWith({}, '', '?chat-type=support');
    });
  });
});
