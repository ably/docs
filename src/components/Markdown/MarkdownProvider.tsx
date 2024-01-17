import React, { FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Link from 'src/components/Link';
import { CodeBlock } from './CodeBlock';

const H1: FC<JSX.IntrinsicElements['h1']> = ({ children, ...props }) => (
  <h1 className="ui-text-h1 my-40" {...props}>
    {children}
  </h1>
);

const H2: FC<JSX.IntrinsicElements['h2']> = ({ children, ...props }) => (
  <h2 className="ui-text-h2 my-32" {...props}>
    {children}
  </h2>
);

const H3: FC<JSX.IntrinsicElements['h3']> = ({ children, ...props }) => (
  <h3 className="ui-text-h3 my-20" {...props}>
    {children}
  </h3>
);

const Paragraph: FC<JSX.IntrinsicElements['p']> = ({ children, ...props }) => (
  <p className="text-p2 mb-20 leading-relaxed" {...props}>
    {children}
  </p>
);

export const Anchor: FC<JSX.IntrinsicElements['a']> = ({ children, href, ...props }) => {
  /**
   * Inspired by https://github.com/gatsbyjs/gatsby/issues/21462#issuecomment-605606702
   * to work around the issues with broken links being emitted by gatsby-plugin-mdx when
   * specifying an assetPrefix (like we do in production). So what we do is we "break"
   * the asset prefix pretty much like gatsby-plugin-mdx does [1], and if we find the
   * broken prefix on the URL we strip it off again...
   *
   * 1. https://github.com/gatsbyjs/gatsby/blob/3d4d6a6e222cf3bff3f2c2cdfb0cc539bad2403a/packages/gatsby-plugin-mdx/src/remark-path-prefix-plugin.ts#L18-L28
   */
  const { site } = useStaticQuery(graphql`
    {
      site {
        assetPrefix
      }
    }
  `);

  let cleanHref = href;
  const assetPrefix = site.assetPrefix ?? '';
  const brokenAssetPrefix = assetPrefix.replace('://', ':/');

  if (href.startsWith(brokenAssetPrefix)) {
    cleanHref = href.slice(brokenAssetPrefix.length);
  }

  return (
    <Link to={cleanHref} className="docs-link" {...props}>
      {children}
    </Link>
  );
};

const Ul: FC<JSX.IntrinsicElements['ul']> = ({ children, ...props }) => (
  <ul className="ui-unordered-list" {...props}>
    {children}
  </ul>
);

const Li: FC<JSX.IntrinsicElements['li']> = ({ children, ...props }) => (
  <li className="ui-text-p2 mb-8" {...props}>
    {children}
  </li>
);

const Code: FC<JSX.IntrinsicElements['code']> = ({ children, ...props }) => (
  <code className="ui-text-code-inline" {...props}>
    {children}
  </code>
);

const Pre: FC<JSX.IntrinsicElements['pre']> = ({ children }) => {
  const lang = (children as React.ReactElement)?.props?.className?.replace('language-', '');

  return (
    <div className="mb-20">
      <CodeBlock language={lang || 'javascript'}>{children}</CodeBlock>
    </div>
  );
};

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  a: Anchor,
  ul: Ul,
  li: Li,
  code: Code,
  pre: Pre,
};

export const MarkdownProvider = ({ children }: { children: React.ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
