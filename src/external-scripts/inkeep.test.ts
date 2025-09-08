import * as scriptLoader from './utils';
import inkeepChat, { inkeepChatIdentifyUser } from './inkeep';

describe('inkeepChat', () => {
  beforeEach(() => {
    document.body.innerHTML = `<script></script>`;
  });

  it('does not load Inkeep when configuration is not present', () => {
    const spy = jest.spyOn(scriptLoader, 'scriptLoader');

    inkeepChat(undefined);

    expect(spy).not.toHaveBeenCalled();
  });

  it('load Inkeep when configuration is present', () => {
    const spy = jest.spyOn(scriptLoader, 'scriptLoader');

    inkeepChat('apiKey', 'http://localhost:3000/api/conversations');

    expect(spy).toHaveBeenCalled();
  });

  describe('inkeepChatIdentifyUser', () => {
    let spy: jest.SpyInstance;
    beforeEach(() => {
      (window as any).inkeepWidget = { update: jest.fn() };
      spy = jest.spyOn((window as any).inkeepWidget, 'update');
      // Remove any device_id meta tags before each test
      document.querySelectorAll('meta[name="device_id"]').forEach((el) => el.remove());
    });

    it('returns when the user is undefined and no deviceId', () => {
      inkeepChatIdentifyUser({});
      expect(spy).not.toHaveBeenCalled();
    });

    it('sets the Inkeep userId, email, and cohorts from user', () => {
      inkeepChatIdentifyUser({ user: { id: '123', email: 'test@example.com', companyName: 'Acme' } });
      expect(spy).toHaveBeenCalledWith({
        baseSettings: {
          userProperties: {
            id: '123',
            email: 'test@example.com',
            cohorts: ['Company: Acme'],
          },
        },
      });
    });

    it('sets the Inkeep userId and email from user without companyName', () => {
      inkeepChatIdentifyUser({ user: { id: '123', email: 'test@example.com' } });
      expect(spy).toHaveBeenCalledWith({ baseSettings: { userProperties: { id: '123', email: 'test@example.com' } } });
    });

    it('sets the Inkeep userId from device_id meta tag when user is not provided', () => {
      const metaTag = document.createElement('meta');
      metaTag.name = 'device_id';
      metaTag.content = 'device123';
      document.head.appendChild(metaTag);
      inkeepChatIdentifyUser({});
      expect(spy).toHaveBeenCalledWith({ baseSettings: { userProperties: { id: 'device123', email: undefined } } });
    });

    it('sets the Inkeep userId from user id, even if device_id meta tag exists', () => {
      const metaTag = document.createElement('meta');
      metaTag.name = 'device_id';
      metaTag.content = 'device123';
      document.head.appendChild(metaTag);
      inkeepChatIdentifyUser({ user: { id: 'user123', email: 'foo@bar.com' } });
      expect(spy).toHaveBeenCalledWith({ baseSettings: { userProperties: { id: 'user123', email: 'foo@bar.com' } } });
    });
  });
});
