import cheerio from 'cheerio';
import { removeParagraphsFromDefinitionListsAndMerge } from './remove-paragraphs-from-definition-lists';

const consecutiveDls = `<dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
</dl>
<dl>
  <dt>Term Two</dt>
  <dd>Definition Two</dd>
  <dt>Term Two</dt>
  <dd>Definition Three</dd>
</dl>`;

const consecutiveDlsWithPElement = `<dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
</dl>
<p></p>
<dl>
  <dt>Term Two</dt>
  <dd>Definition Two</dd>
  <dt>Term Two</dt>
  <dd>Definition Three</dd>
</dl>`;

describe('Consecutive Dl elements are merged', () => {
  it('Merges consecutive Dl elements', () => {
    const loadedDom = cheerio.load(consecutiveDls);
    removeParagraphsFromDefinitionListsAndMerge(loadedDom);
    expect(loadedDom.html()).toBe(`<html><head></head><body><dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
<dt>Term Two</dt><dd>Definition Two</dd><dt>Term Two</dt><dd>Definition Three</dd></dl>
</body></html>`);
  });
  it('Merges consecutive Dl elements with intervening empty p element', () => {
    const loadedDom = cheerio.load(consecutiveDlsWithPElement);
    removeParagraphsFromDefinitionListsAndMerge(loadedDom);
    expect(loadedDom.html()).toBe(`<html><head></head><body><dl>
  <dt>Term One</dt>
  <dd>Definition One</dd>
<dt>Term Two</dt><dd>Definition Two</dd><dt>Term Two</dt><dd>Definition Three</dd></dl>

</body></html>`);
  });

  it('Renders an image if a dl is on the same page', () => {
    const loadedDom =
      cheerio.load(`<p>Ably&#8217;s presence feature allows clients or devices to announce their presence on a channel. Other devices or services may then subscribe to these presence events (such as entering, updating their state, or leaving the channel) in real time using our <a href=\\"/realtime\\">realtime SDKs</a>, or via the <a href=\\"/general/integrations\\">Ably Integrations</a>. You can also request a list of clients or devices that are online/offline on a channel at a particular point in time via the <a href=\\"/api/rest-api#presence\\"><span class=\\"caps\\">REST</span> <span class=\\"caps\\">API</span></a>.</p>
    <p><a href=\\"/images/diagrams/Channels-Presence.gif\\" target=\\"_blank\\">
     <img src=\\"/images/diagrams/Channels-Presence.gif\\" alt=\\"Presence representation\\" /></a></p>
    <p>Furthermore, if persistence is enabled on the presence channel, you can also retrieve <a href=\\"/api/rest-sdk/history#presence-history\\">presence history</a> for the channel, i.e, static data about historical presence states of your clients/devices. This operation also can be done using both Ably&#8217;s <a href=\\"/realtime\\">Realtime</a> and <a href=\\"/rest\\"><span class=\\"caps\\">REST</span></a> libraries.</p>
    <h2 id=\\"occupancy-presence\\">Occupancy and presence</h2>
    <p>The occupancy and presence features differ in the following ways:</p>
    <dl>
    	<dt>Occupancy</dt>
    	<dd>provides metrics about the clients attached to a channel. This includes a count of the number of clients attached, the number of publishers and subscribers, the number of presence members, and the number of presence publishers and subscribers.</dd>
    	<dt>Presence</dt>
    	<dd>provides information about the activity of members entered into the presence set of a channel. Presence members announce their state to presence subscribers via presence events. For example, when entering the presence set, leaving the presence set, or updating their member data.</dd>
    </dl>`);
    removeParagraphsFromDefinitionListsAndMerge(loadedDom);
    expect(loadedDom.html()).toMatchInlineSnapshot(`
      "<html><head></head><body><p>Ably’s presence feature allows clients or devices to announce their presence on a channel. Other devices or services may then subscribe to these presence events (such as entering, updating their state, or leaving the channel) in real time using our <a href="\\&quot;/realtime\\&quot;">realtime SDKs</a>, or via the <a href="\\&quot;/general/integrations\\&quot;">Ably Integrations</a>. You can also request a list of clients or devices that are online/offline on a channel at a particular point in time via the <a href="\\&quot;/api/rest-api#presence\\&quot;"><span class="\\&quot;caps\\&quot;">REST</span> <span class="\\&quot;caps\\&quot;">API</span></a>.</p>
          <p><a href="\\&quot;/images/diagrams/Channels-Presence.gif\\&quot;" target="\\&quot;_blank\\&quot;">
           <img src="\\&quot;/images/diagrams/Channels-Presence.gif\\&quot;" alt="\\&quot;Presence" representation\\"=""></a></p>
          <p>Furthermore, if persistence is enabled on the presence channel, you can also retrieve <a href="\\&quot;/api/rest-sdk/history#presence-history\\&quot;">presence history</a> for the channel, i.e, static data about historical presence states of your clients/devices. This operation also can be done using both Ably’s <a href="\\&quot;/realtime\\&quot;">Realtime</a> and <a href="\\&quot;/rest\\&quot;"><span class="\\&quot;caps\\&quot;">REST</span></a> libraries.</p>
          <h2 id="\\&quot;occupancy-presence\\&quot;">Occupancy and presence</h2>
          <p>The occupancy and presence features differ in the following ways:</p>
          <dl>
          	<dt>Occupancy</dt>
          	<dd>provides metrics about the clients attached to a channel. This includes a count of the number of clients attached, the number of publishers and subscribers, the number of presence members, and the number of presence publishers and subscribers.</dd>
          	<dt>Presence</dt>
          	<dd>provides information about the activity of members entered into the presence set of a channel. Presence members announce their state to presence subscribers via presence events. For example, when entering the presence set, leaving the presence set, or updating their member data.</dd>
          </dl></body></html>"
    `);
  });
});
