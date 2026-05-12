import Aside from './Aside';
import Code from './Code';
import Tiles from './Tiles';
import MethodSignature from './MethodSignature';
import Table from './Table';
import { Tabs, Tab } from './Tabs';

/**
 * Components map passed to MDX rendering. Tags used in MDX (`<Aside>`,
 * `<Code>`, etc.) resolve against this map; anything not listed renders as a
 * plain HTML element (or fails if the tag isn't valid HTML).
 *
 * `<If>` is not here — it's transformed into `<div data-*-gate>` at the
 * remark stage (src/plugins/remarkIfGate.mjs) and never reaches render.
 */
// Pass-through overrides for `pre` and `code` so Astro's MDX doesn't
// collapse fenced code blocks into an opaque <StaticHtml> wrapper. That
// matters because <Code> from @ably/ui walks its React children looking
// for `<code class="language-X">` — if the block is opaque HTML, the
// language detection fails and CodeSnippet renders the "no sample"
// warning.
//
// These return plain React elements so the tree is introspectable.
import type { HTMLAttributes } from 'react';
import { createElement } from 'react';

const Pre = (props: HTMLAttributes<HTMLPreElement>) => createElement('pre', props);
const CodeEl = (props: HTMLAttributes<HTMLElement>) => createElement('code', props);

export const mdxComponents = {
  Aside,
  Code,
  Tiles,
  MethodSignature,
  Table,
  Tabs,
  Tab,
  pre: Pre,
  code: CodeEl,
};
