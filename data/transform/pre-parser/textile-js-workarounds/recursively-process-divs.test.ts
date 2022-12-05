import { recursivelyProcessDivs } from '..';

describe('Divs that contain examples of textile to be processed correctly', () => {
  it('Renders a known example from api/realtime-sdk/channels.textile correctly', () => {
    expect(
      recursivelyProcessDivs(`
<div lang="jsall">
bq(definition#on-state-array-listener).
  jsall: on(String[] events, listener("ChannelStateChange":#channel-state-change stateChange))

Same as above, but registers multiple listeners, one for each event in the array.
</div>`),
    ).toMatchInlineSnapshot(`
      "
      <notextile><div lang=\\"jsall\\"><blockquote class=\\"definition\\" id=\\"on-state-array-listener\\"><p class=\\"definition\\"><span lang=\\"javascript,nodejs\\">on(String[] events, listener(<a href=\\"#channel-state-change\\">ChannelStateChange</a> stateChange))</span></p></blockquote><p>Same as above, but registers multiple listeners, one for each event in the array.</p></div></notextile>"
    `);
  });
});
