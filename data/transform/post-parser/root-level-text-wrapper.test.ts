import { rootLevelTextWrapper } from './root-level-text-wrapper';

// If this is broken, the line beginning with 'Wherever possible..." will show up
// as only the word 'HATEOS', with no surrounding elements when it is parsed by Cheerio.
const sampleUnwrappedText = `<p>The properties of an Ably error are:</p>
<dl>
  <dt>code</dt>
  <dd>A specific reason code as defined in the <a href="https://github.com/ably/ably-common/blob/main/protocol/errors.json">public errors definition</a>, where one is known</dd>
  <dt>statusCode</dt>
  <dd>Where a code is not available, the statusCode provides a generic indication of the nature of the failure and maps to <a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes">standard <span class="caps">HTTP</span> statusCodes</a></dd>
  <dt>message</dt>
  <dd>The message string is an English language string that aims to provide useful information to the developer. It is not necessarily intended to be an informative string for the end user</dd>
</dl>
Wherever possible, success response bodies contain links, in <a href="https://en.wikipedia.org/wiki/HATEOAS"><span class="caps">HATEOS</span></a> style, to other resources relevant to the response; where these are present these are included as <code>href</code> attributes on the applicable part of the response object.
<p><code>GET</code>, <code>PUT</code>, <code>POST</code> and <code>DELETE</code> are available in all contexts where they make sense. <code>GET</code> is always idempotent.</p>`;

const spanInclusiveUnwrappedTextSample = `<p>{{LANG_<span class="caps">BLOCK</span>[default]}}</p>
<p>This will instantiate the library using the specified <a href="#client-options">ClientOptions</a>.</p>
<p>{{/LANG_<span class="caps">BLOCK</span>}}</p>
<p>{{LANG_<span class="caps">BLOCK</span>[ruby]}}</p>
<p>This will instantiate the library and create a new <code>Ably::Rest::Client</code> using the specified <a href="#client-options"><code>ClientOptions</code></a>.</p>
<p>{{/LANG_<span class="caps">BLOCK</span>}}<br />
The <span class="caps">REST</span> constructor is used to instantiate the library. The <span class="caps">REST</span> library may be instantiated multiple times with the same or different <a href="#client-options"><code>ClientOptions</code></a> in any given context. Except where specified otherwise, instances operate independently of one another.</p>`;

const postTransformUnwrappedTextSample = rootLevelTextWrapper(sampleUnwrappedText);

const postTransformUnwrappedTextSampleWithSpans = rootLevelTextWrapper(spanInclusiveUnwrappedTextSample);

it('No section should be left unwrapped by an HTML element at the root level', () => {
  expect(postTransformUnwrappedTextSample).toBe(`<p>The properties of an Ably error are:</p>
<dl>
  <dt>code</dt>
  <dd>A specific reason code as defined in the <a href="https://github.com/ably/ably-common/blob/main/protocol/errors.json">public errors definition</a>, where one is known</dd>
  <dt>statusCode</dt>
  <dd>Where a code is not available, the statusCode provides a generic indication of the nature of the failure and maps to <a href="https://en.wikipedia.org/wiki/List_of_HTTP_status_codes">standard <span class="caps">HTTP</span> statusCodes</a></dd>
  <dt>message</dt>
  <dd>The message string is an English language string that aims to provide useful information to the developer. It is not necessarily intended to be an informative string for the end user</dd>
</dl>
<p>Wherever possible, success response bodies contain links, in <a href="https://en.wikipedia.org/wiki/HATEOAS"><span class="caps">HATEOS</span></a> style, to other resources relevant to the response; where these are present these are included as <code>href</code> attributes on the applicable part of the response object.</p>
<p><code>GET</code>, <code>PUT</code>, <code>POST</code> and <code>DELETE</code> are available in all contexts where they make sense. <code>GET</code> is always idempotent.</p>`);

  expect(postTransformUnwrappedTextSampleWithSpans).toBe(`<p>{{LANG_<span class="caps">BLOCK</span>[default]}}</p>
<p>This will instantiate the library using the specified <a href="#client-options">ClientOptions</a>.</p>
<p>{{/LANG_<span class="caps">BLOCK</span>}}</p>
<p>{{LANG_<span class="caps">BLOCK</span>[ruby]}}</p>
<p>This will instantiate the library and create a new <code>Ably::Rest::Client</code> using the specified <a href="#client-options"><code>ClientOptions</code></a>.</p>
<p>{{/LANG_<span class="caps">BLOCK</span>}}<br />
<p>The <span class="caps">REST</span> constructor is used to instantiate the library. The <span class="caps">REST</span> library may be instantiated multiple times with the same or different <a href="#client-options"><code>ClientOptions</code></a> in any given context. Except where specified otherwise, instances operate independently of one another.</p></p>`);
});
