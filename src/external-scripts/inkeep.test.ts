import * as scriptLoader from './utils';
import inkeepChat, { inkeepChatIdentifyUser } from './inkeep';

const identifyKey = 'key';

describe('inkeepChat', () => {
  beforeEach(() => {
    document.body.innerHTML = `<script></script>`;
  });

  it('does not load Inkeep when configuration is not present', () => {
    const spy = jest.spyOn(scriptLoader, 'scriptLoader');

    inkeepChat(undefined, 'integrationId', 'organizationId');

    expect(spy).not.toHaveBeenCalled();
  });

  it('load Inkeep when configuration is present', () => {
    const spy = jest.spyOn(scriptLoader, 'scriptLoader');

    inkeepChat('apiKey', 'integrationId', 'organizationId');

    expect(spy).toHaveBeenCalled();
  });

  describe('inkeepChatIdentifyUser', () => {
    let spy;

    beforeEach(() => {
      global.inkeepWidget = { render: jest.fn };
      spy = jest.spyOn(global.inkeepWidget, 'render');
    });

    it('returns when the user is undefined', () => {
      inkeepChatIdentifyUser({ account: { uuid: '123' } });

      expect(spy).not.toHaveBeenCalled();
    });

    it('sets the Inkeep userId', () => {
      inkeepChatIdentifyUser({ user: { uuid: '123' } });

      expect(spy).toHaveBeenCalledWith({ baseSettings: { userId: '123' } });
    });
  });
});
