import { visit } from 'unist-util-visit';

/**
 * Surface the fenced-block language as a `data-lang` attribute on any
 * wrapping `<Code>` JSX element in MDX. Astro's MDX compiles fenced blocks
 * into an opaque <StaticHtml> wrapper downstream, so the React-side Code
 * shortcode can't introspect children to find a language class. This
 * plugin runs before that transform and lifts the language up.
 *
 * Input:   <Code>```shell\nfoo\n```</Code>
 * Output:  <Code data-lang="shell">```shell\nfoo\n```</Code>
 */
export const remarkCodeLang = () => (tree) => {
  visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
    if (node.name !== 'Code') return;
    const codeChild = (node.children ?? []).find((c) => c.type === 'code');
    if (!codeChild?.lang) return;

    // Don't override an explicit prop the author set.
    const attrs = node.attributes ?? (node.attributes = []);
    if (attrs.some((a) => a.type === 'mdxJsxAttribute' && a.name === 'data-lang')) return;

    attrs.push({
      type: 'mdxJsxAttribute',
      name: 'data-lang',
      value: codeChild.lang,
    });
  });
};
