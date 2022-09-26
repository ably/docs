import cheerio from 'cheerio';
import { postParser } from '../transform/post-parser';
import { preParser } from '../transform/pre-parser';
import textile from 'textile-js';
import { removeChildrenFromPreWrappedCodeElements } from './remove-children-from-pre-wrapped-code-elements';

type CheerioMutator = (cheerioNodes: cheerio.Selector) => void;

const loadAndMutateDom = (f: CheerioMutator) => (content: string) => {
  const loadedDom = cheerio.load(content);
  f(loadedDom);
  return loadedDom;
};

const getDomWithoutChildrenFromPreWrappedCodeElements = loadAndMutateDom(removeChildrenFromPreWrappedCodeElements);

const htmlEnclosedContent = `<pre><code>
    <dt><div lang='javascript'>Term</div></dt>
    <dd>Definition</dd>
</code></pre>`;

const githubEnclosedContent = postParser(
  textile(
    preParser(`\`\`\`[ruby]
EventMachine.run do
  ably = Ably::Realtime.new(key: api_key)
end
\`\`\``),
  ),
);

describe('Safely remove children from pre-wrapped code elements', () => {
  it('Removes unwanted HTML elements from code', () => {
    const loadedDom = getDomWithoutChildrenFromPreWrappedCodeElements(htmlEnclosedContent);
    const html = loadedDom('body').html() ?? '';
    expect(html).toBe(`<pre><code>
    Term
    Definition
</code></pre>`);
  });
  it('Ensures Github code blocks are parsed correctly', () => {
    const loadedDom = getDomWithoutChildrenFromPreWrappedCodeElements(githubEnclosedContent);
    const html = loadedDom('body').html() ?? '';
    expect(html).toBe(`<pre lang="ruby"><code lang="ruby">
EventMachine.run do
  ably = Ably::Realtime.new(key: api_key)
end

</code></pre>`);
  });
});
