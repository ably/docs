import { visit } from 'unist-util-visit';

/**
 * Preserve the code fence meta string as a `data-meta` attribute on the
 * <code> element. Ported from the Gatsby config (gatsby-config.ts:12).
 */
export const remarkCodeMeta = () => (tree) => {
  visit(tree, 'code', (node) => {
    if (node.meta) {
      node.data = node.data || {};
      node.data.hProperties = node.data.hProperties || {};
      node.data.hProperties['data-meta'] = node.meta;
    }
  });
};
