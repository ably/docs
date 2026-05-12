import { visit } from 'unist-util-visit';

/**
 * Transform `<If>` JSX tags in MDX into plain `<div>` wrappers with data
 * attributes that a small global script (scripts/gate-toggle.ts) uses to
 * toggle visibility via CSS.
 *
 * Retires the If React component entirely and removes ~1,200 hydration sites.
 *
 * Supported props (match src/components/Layout/mdx/If.tsx):
 *   lang="javascript"              → data-lang-gate="javascript"
 *   lang="javascript,python"       → data-lang-gate="javascript,python"
 *   clientLang="javascript"        → data-client-lang-gate="javascript"
 *   agentLang="python"             → data-agent-lang-gate="python"
 *   loggedIn        (bare prop)    → data-auth-gate="required"
 *   loggedIn={true}                → data-auth-gate="required"
 *   loggedIn={false}               → data-auth-gate="anonymous"
 *
 * Anything else is passed through as a data-* attribute so a fallback island
 * can handle exotic cases without this plugin blocking the build.
 */
export const remarkIfGate = () => (tree) => {
  const transform = (node) => {
    if (node.name !== 'If') return;

    const newAttributes = [];
    for (const attr of node.attributes ?? []) {
      if (attr.type !== 'mdxJsxAttribute') {
        // Spread (`{...props}`) or unusual form; pass through unchanged.
        newAttributes.push(attr);
        continue;
      }
      const { name, value } = attr;
      const resolved = resolveAttributeValue(value);

      if (name === 'lang') {
        // Normalise "js,py" → "js py" so CSS `~=` word matcher works cleanly.
        newAttributes.push(
          stringAttr('data-lang-gate', (resolved.asString ?? '').replace(/,/g, ' ')),
        );
      } else if (name === 'clientLang') {
        newAttributes.push(
          stringAttr('data-client-lang-gate', (resolved.asString ?? '').replace(/,/g, ' ')),
        );
      } else if (name === 'agentLang') {
        newAttributes.push(
          stringAttr('data-agent-lang-gate', (resolved.asString ?? '').replace(/,/g, ' ')),
        );
      } else if (name === 'loggedIn') {
        newAttributes.push(
          stringAttr('data-auth-gate', resolved.asBool === false ? 'anonymous' : 'required'),
        );
      } else if (name === 'className' || name === 'class') {
        newAttributes.push(stringAttr('class', `gate ${resolved.asString ?? ''}`.trim()));
      } else {
        // Unknown prop — pass through so we don't silently drop intent.
        newAttributes.push(stringAttr(`data-if-${kebab(name)}`, resolved.asString ?? ''));
      }
    }

    if (!newAttributes.some((a) => a.name === 'class')) {
      newAttributes.push(stringAttr('class', 'gate'));
    }

    node.name = 'div';
    node.attributes = newAttributes;
  };

  visit(tree, 'mdxJsxFlowElement', transform);
  visit(tree, 'mdxJsxTextElement', transform);
};

const stringAttr = (name, value) => ({
  type: 'mdxJsxAttribute',
  name,
  value: value ?? '',
});

const kebab = (s) => s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const resolveAttributeValue = (value) => {
  if (value == null) return { asString: null, asBool: true };
  if (typeof value === 'string') return { asString: value, asBool: value !== 'false' };
  if (value.type === 'mdxJsxAttributeValueExpression') {
    const raw = (value.value ?? '').trim();
    if (raw === 'true') return { asString: 'true', asBool: true };
    if (raw === 'false') return { asString: 'false', asBool: false };
    const unquoted = raw.replace(/^['"]|['"]$/g, '');
    return { asString: unquoted, asBool: raw !== 'false' };
  }
  return { asString: null, asBool: true };
};
