const cheerio = require('cheerio');
const { duplicateLangAttributes } = require('./duplicate-lang-attributes');
const { DOCUMENTATION_PATH } = require('../transform/constants');

const content = `<div lang='javascript,csharp,objc'>Content</div>`;

const nestedSpanContent = `<div lang="nodejs">
<blockquote id="on-state-array-listener" class="definition">
<p class="definition"><span lang="javascript,nodejs">on(String[] events, listener(<a href="${DOCUMENTATION_PATH}realtime/channels/language/javascript,nodejs/#channel-state-change">ChannelStateChange</a> stateChange))</span></p>
</blockquote>
<p>Same as above, but registers multiple listeners, one for each event in the array.</p>
</div>`;

describe('Duplicate language blocks with commas', () => {
  it('Duplicates language blocks with commas', () => {
    const loadedDom = cheerio.load(content, null);
    duplicateLangAttributes(loadedDom);
    expect(loadedDom.html().replace(/\s+/g, '')).toEqual(
      `<html><head></head><body>
            <div lang="objc">Content</div>
            <div lang="csharp">Content</div>
            <div lang="javascript">Content</div>
        </body></html>`.replace(/\s+/g, ''),
    );
  });

  it('Duplicates nested span language blocks with commas', () => {
    const loadedDom = cheerio.load(nestedSpanContent, null);
    duplicateLangAttributes(loadedDom);
    expect(loadedDom.html().replace(/\s+/g, '')).toEqual(
      `<html><head></head><body><div lang="nodejs">
        <blockquote id="on-state-array-listener" class="definition">
            <p class="definition">
                <span lang="nodejs">on(String[] events, listener(<a href="${DOCUMENTATION_PATH}realtime/channels/language/javascript,nodejs/#channel-state-change">ChannelStateChange</a> stateChange))</span>
                <span lang="javascript">on(String[] events, listener(<a href="${DOCUMENTATION_PATH}realtime/channels/language/javascript,nodejs/#channel-state-change">ChannelStateChange</a> stateChange))</span>
            </p>
        </blockquote>
        <p>Same as above, but registers multiple listeners, one for each event in the array.</p>
        </div></body></html>`.replace(/\s+/g, ''),
    );
  });
});
