import { textileToHtml } from '../../data/test-utilities/process-textile';
import { preParser } from './pre-parser';

const dubiousBlangFixture = `
h4.
  default: Properties
  java:    Members
  ruby:    Attributes

blang[default].
  - <span lang="ruby">:cipher</span><span lang="csharp,go">CipherParams</span><span lang="jsall,java,swift,objc">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/realtime/encryption#getting-started<br>__Type: "@CipherParams@":/api/realtime-sdk/encryption#cipher-params<span lang="jsall"> or an options object containing at a minimum a @key@</span><span lang="java"> or a @Param[]@ list containing at a minimum a @key@</span><span lang="ruby"> or an options hash containing at a minimum a @key@</span><span lang="php"> or an Associative Array containing at a minimum a @key@</span>__

blang[jsall,java,swift,objc,csharp].
- <span lang="jsall,java,swift,objc">params</span><span lang="csharp">Params</span> := Optional "parameters":/realtime/channels/channel-parameters/overview which specify behaviour of the channel.<br>__Type: <span lang='java'>@Map<String, String>@</span><span lang='jsall,objc,csharp,swift'>@JSON Object@</span>__
- <span lang="jsall,java,swift,objc">cipher</span><span lang="csharp">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See "an example":/api/realtime-sdk/encryption#getting-started<br>__Type: "@CipherParams@":/api/realtime-sdk/encryption#cipher-params<span lang="jsall"> or an options object containing at a minimum a @key@</span><span lang="java"> or a @Param[]@ list containing at a minimum a @key@</span><span lang="ruby"> or an options hash containing at a minimum a @key@</span><span lang="php"> or an Associative Array containing at a minimum a @key@</span>__

blang[java].
h4. Static methods

h6(#with-cipher-key). withCipherKey

bq(definition). static ChannelOptions.withCipherKey(Byte[] or String key)

A helper method to generate a @ChannelOptions@ for the simple case where you only specify a key.

h4. Parameters

- key := A binary @Byte[]@ array or a base64-encoded @String@.

h4. Returns

On success, the method returns a complete @ChannelOptions@ object. Failure will raise an "@AblyException@":/api/realtime-sdk/types#ably-exception.`;

describe('Test channel options rendering', () => {
  it('Ensures channel options renders correctly', () => {
    expect(preParser(dubiousBlangFixture)).toMatchInlineSnapshot(`
      "
      <h4><span lang='default'>Properties</span><span lang='java'>Members</span><span lang='ruby'>Attributes</span></h4>


      {{LANG_BLOCK[default]}}

      - <span lang=\\"ruby\\">:cipher</span><span lang=\\"csharp,go\\">CipherParams</span><span lang=\\"javascript,nodejs,java,swift,objc\\">cipher</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See <a href=\\"/realtime/encryption#getting-started\\">an example</a><br><em class=\\"italics\\">Type: <a href=\\"/api/realtime-sdk/encryption#cipher-params\\"><code>CipherParams</code></a><span lang=\\"javascript,nodejs\\"> or an options object containing at a minimum a <code>key</code></span><span lang=\\"java\\"> or a <code>Param[]</code> list containing at a minimum a <code>key</code></span><span lang=\\"ruby\\"> or an options hash containing at a minimum a <code>key</code></span><span lang=\\"php\\"> or an Associative Array containing at a minimum a <code>key</code></span></em>

      {{/LANG_BLOCK}}


      {{LANG_BLOCK[javascript,nodejs,java,swift,objc,csharp]}}

      {{/LANG_BLOCK}}

      - <span lang=\\"javascript,nodejs,java,swift,objc\\">params</span><span lang=\\"csharp\\">Params</span> := Optional <a href=\\"/realtime/channels/channel-parameters/overview\\">parameters</a> which specify behaviour of the channel.<br><em class=\\"italics\\">Type: <span lang='java'><code>Map<String, String></code></span><span lang=\\"javascript,nodejs,objc,csharp,swift\\"><code>JSON Object</code></span></em>
      - <span lang=\\"javascript,nodejs,java,swift,objc\\">cipher</span><span lang=\\"csharp\\">CipherParams</span> := Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See <a href=\\"/api/realtime-sdk/encryption#getting-started\\">an example</a><br><em class=\\"italics\\">Type: <a href=\\"/api/realtime-sdk/encryption#cipher-params\\"><code>CipherParams</code></a><span lang=\\"javascript,nodejs\\"> or an options object containing at a minimum a <code>key</code></span><span lang=\\"java\\"> or a <code>Param[]</code> list containing at a minimum a <code>key</code></span><span lang=\\"ruby\\"> or an options hash containing at a minimum a <code>key</code></span><span lang=\\"php\\"> or an Associative Array containing at a minimum a <code>key</code></span></em>


      {{LANG_BLOCK[java]}}

      {{/LANG_BLOCK}}

      <h4>Static methods</h4>

      <h6 id=\\"with-cipher-key\\">withCipherKey</h6>

      bq(definition). static ChannelOptions.withCipherKey(Byte[] or String key)

      A helper method to generate a <code>ChannelOptions</code> for the simple case where you only specify a key.

      <h4>Parameters</h4>

      - key := A binary <code>Byte[]</code> array or a base64-encoded <code>String</code>.

      <h4>Returns</h4>

      On success, the method returns a complete <code>ChannelOptions</code> object. Failure will raise an \\"<code>AblyException</code>\\":/api/realtime-sdk/types#ably-exception."
    `);
    expect(textileToHtml(dubiousBlangFixture)).toMatchInlineSnapshot(`
      "<p><h4><span lang=\\"default\\">Properties</span><span lang=\\"java\\">Members</span><span lang=\\"ruby\\">Attributes</span></h4></p>
      <div lang=\\"default\\"><!-- start default language block -->

      <dl>
      	<dt><span lang=\\"ruby\\">:cipher</span><span lang=\\"csharp,go\\">CipherParams</span><span lang=\\"javascript,nodejs,java,swift,objc\\">cipher</span></dt>
      	<dd>Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See <a href=\\"/realtime/encryption#getting-started\\">an example</a><br /><em class=\\"italics\\">Type: <a href=\\"/api/realtime-sdk/encryption#cipher-params\\"><code>CipherParams</code></a><span lang=\\"javascript,nodejs\\"> or an options object containing at a minimum a <code>key</code></span><span lang=\\"java\\"> or a <code>Param[]</code> list containing at a minimum a <code>key</code></span><span lang=\\"ruby\\"> or an options hash containing at a minimum a <code>key</code></span><span lang=\\"php\\"> or an Associative Array containing at a minimum a <code>key</code></span></em></dd>
      </dl></div><!-- /end default language block --><div lang=\\"javascript,nodejs,java,swift,objc,csharp\\"><!-- start javascript,nodejs,java,swift,objc,csharp language block -->
      </div><!-- /end javascript,nodejs,java,swift,objc,csharp language block --><dl>
      	<dt><span lang=\\"javascript,nodejs,java,swift,objc\\">params</span><span lang=\\"csharp\\">Params</span></dt>
      	<dd>Optional <a href=\\"/realtime/channels/channel-parameters/overview\\">parameters</a> which specify behaviour of the channel.<br /><em class=\\"italics\\">Type: <span lang=\\"java\\"><code>Map&lt;String, String&gt;</code></span><span lang=\\"javascript,nodejs,objc,csharp,swift\\"><code>JSON Object</code></span></em></dd>
      	<dt><span lang=\\"javascript,nodejs,java,swift,objc\\">cipher</span><span lang=\\"csharp\\">CipherParams</span></dt>
      	<dd>Requests encryption for this channel when not null, and specifies encryption-related parameters (such as algorithm, chaining mode, key length and key). See <a href=\\"/api/realtime-sdk/encryption#getting-started\\">an example</a><br /><em class=\\"italics\\">Type: <a href=\\"/api/realtime-sdk/encryption#cipher-params\\"><code>CipherParams</code></a><span lang=\\"javascript,nodejs\\"> or an options object containing at a minimum a <code>key</code></span><span lang=\\"java\\"> or a <code>Param[]</code> list containing at a minimum a <code>key</code></span><span lang=\\"ruby\\"> or an options hash containing at a minimum a <code>key</code></span><span lang=\\"php\\"> or an Associative Array containing at a minimum a <code>key</code></span></em></dd>
      </dl>
      <p></p>
      <div lang=\\"java\\"><!-- start java language block -->
      </div><!-- /end java language block --><p><h4>Static methods</h4></p>
      <p><h6 id=\\"with-cipher-key\\">withCipherKey</h6></p>
      <blockquote class=\\"definition\\">
      <p class=\\"definition\\">static ChannelOptions.withCipherKey(Byte[] or String key)</p>
      </blockquote>
      <p>A helper method to generate a <code>ChannelOptions</code> for the simple case where you only specify a key.</p>
      <p><h4>Parameters</h4></p>
      <dl>
      	<dt>key</dt>
      	<dd>A binary <code>Byte[]</code> array or a base64-encoded <code>String</code>.</dd>
      </dl>
      <h4>Returns</h4>
      <p>On success, the method returns a complete <code>ChannelOptions</code> object. Failure will raise an <a href=\\"/api/realtime-sdk/types#ably-exception\\"><code>AblyException</code></a>.</p>"
    `);
  });
});
