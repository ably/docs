import React, { FC } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';
import { MDXProvider } from '@mdx-js/react';
import Link from 'src/components/Link';
import { CodeBlock } from './CodeBlock';

const H1: FC<JSX.IntrinsicElements['h1']> = ({ children, ...props }) => (
  <h1 className="ui-text-h1 my-10" {...props}>
    {children}
  </h1>
);

const H2: FC<JSX.IntrinsicElements['h2']> = ({ children, ...props }) => (
  <h2 className="ui-text-h2 my-8" {...props}>
    {children}
  </h2>
);

const H3: FC<JSX.IntrinsicElements['h3']> = ({ children, ...props }) => (
  <h3 className="ui-text-h3 my-5" {...props}>
    {children}
  </h3>
);

const H4: FC<JSX.IntrinsicElements['h4']> = ({ children, ...props }) => (
  <h4 className="ui-text-h4 my-5" {...props}>
    {children}
  </h4>
);

const H5: FC<JSX.IntrinsicElements['h5']> = ({ children, ...props }) => (
  <h5 className="ui-text-h5 my-5" {...props}>
    {children}
  </h5>
);

const Paragraph: FC<JSX.IntrinsicElements['p']> = ({ children, ...props }) => (
  <p className="ui-text-p2 mb-5" {...props}>
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
  const location = useLocation();

  let cleanHref = href;
  const assetPrefix = site.assetPrefix ?? '';
  const brokenAssetPrefix = assetPrefix.replace('://', ':/');

  if (href?.startsWith(brokenAssetPrefix)) {
    cleanHref = href.slice(brokenAssetPrefix.length);
  }

  // Add lang param from current URL if available
  const urlParams = new URLSearchParams(location.search);
  const langParam = urlParams.get('lang');

  if (langParam && cleanHref && !cleanHref.startsWith('#')) {
    const url = new URL(cleanHref, 'https://ably.com');
    url.searchParams.set('lang', langParam);
    cleanHref = url.pathname + url.search;
  }

  return (
    <Link to={cleanHref ?? '#'} className="ui-link" {...props}>
      {children}
    </Link>
  );
};

const Ol: FC<JSX.IntrinsicElements['ol']> = ({ children, ...props }) => (
  <ol className="ui-ordered-list" {...props}>
    {children}
  </ol>
);

const Ul: FC<JSX.IntrinsicElements['ul']> = ({ children, ...props }) => (
  <ul className="ui-unordered-list" {...props}>
    {children}
  </ul>
);

const Li: FC<JSX.IntrinsicElements['li']> = ({ children, ...props }) => (
  <li className="ui-text-p2 mb-2" {...props}>
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
    <div className="mb-5">
      <CodeBlock language={lang || 'javascript'}>{children}</CodeBlock>
    </div>
  );
};

const defaultComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  p: Paragraph,
  a: Anchor,
  ol: Ol,
  ul: Ul,
  li: Li,
  code: Code,
  pre: Pre,
};

export const MarkdownProvider = ({
  children,
  components,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: Record<string, React.FC<any>>;
}) => <MDXProvider components={{ ...defaultComponents, ...components }}>{children}</MDXProvider>;
