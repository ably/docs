import { preParser } from './pre-parser';
import textile from 'textile-js';
import { postParser } from './post-parser';

const text = `<div lang="objc,swift,csharp"></div>
<div lang="default">
bq(definition#subscribe-event-array).
  default: subscribe(String[] "actions":#presence-action, listener("PresenceMessage":#presence-message))
  java:    void subscribe("PresenceMessage.Action[]":#presence-action actions, "PresenceListener":#presence-listener listener)
  ruby:    subscribe("PresenceMessage::ACTION":#presence-action *actions) → yields "PresenceMessage":#presence-message

Subscribe a single listener to messages on this channel for multiple @name@ values.
</div>`;

describe('what', () => {
  it('should work', () => {
    expect(postParser(textile(preParser(text)))).toMatchInlineSnapshot(`
      "<div lang=\\"objc,swift,csharp\\"></div>
      <div lang=\\"default\\">
      <blockquote class=\\"definition\\" id=\\"subscribe-event-array\\">
      <p class=\\"definition\\"><span lang=\\"default\\">subscribe(String[] <a href=\\"#presence-action\\">actions</a>, listener(<a href=\\"#presence-message))\\">PresenceMessage</a></span><span lang=\\"java\\">void subscribe(<a href=\\"#presence-action\\">PresenceMessage.Action[]</a> actions, <a href=\\"#presence-listener\\">PresenceListener</a> listener)</span><span lang=\\"ruby\\">subscribe(<a href=\\"#presence-action\\">PresenceMessage::ACTION</a> *actions) → yields <a href=\\"#presence-message\\">PresenceMessage</a></span></p>
      </blockquote>
      <p>Subscribe a single listener to messages on this channel for multiple <code>name</code> values.</p>
      </div>"
    `);
  });
});
