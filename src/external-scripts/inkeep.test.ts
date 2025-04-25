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

    inkeepChat('apiKey');

    expect(spy).toHaveBeenCalled();
  });

  describe('inkeepChatIdentifyUser', () => {
    let spy;

    beforeEach(() => {
      global.inkeepWidget = { update: jest.fn };
      spy = jest.spyOn(global.inkeepWidget, 'update');
    });

    it('returns when the user is undefined', () => {
      inkeepChatIdentifyUser({});

      expect(spy).not.toHaveBeenCalled();
    });

    it('sets the Inkeep userId', () => {
      inkeepChatIdentifyUser({ user: { uuid: '123' } });

      expect(spy).toHaveBeenCalledWith({ baseSettings: { userProperties: { id: '123' } } });
    });

    it('sets the Inkeep userId from device_id meta tag when user is not provided', () => {
      const metaTag = document.createElement('meta');
      metaTag.name = 'device_id';
      metaTag.content = 'device123';
      document.head.appendChild(metaTag);

      inkeepChatIdentifyUser({});

      expect(spy).toHaveBeenCalledWith({ baseSettings: { userProperties: { id: 'device123' } } });
    });

    it('sets the Inkeep userId from user uuid, even if device_id meta tag exists', () => {
      const metaTag = document.createElement('meta');
      metaTag.name = 'device_id';
      metaTag.content = 'device123';
      document.head.appendChild(metaTag);

      inkeepChatIdentifyUser({ user: { uuid: 'user123' } });

      expect(spy).toHaveBeenCalledWith({ baseSettings: { userProperties: { id: 'user123' } } });
    });
  });
});
