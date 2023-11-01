import React, { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'src/components/Link';

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
  <h3 className="ui-text-h3 my-24" {...props}>
    {children}
  </h3>
);

const Paragraph: FC<JSX.IntrinsicElements['p']> = ({ children, ...props }) => (
  <p className="text-p2 mb-24 leading-relaxed" {...props}>
    {children}
  </p>
);

const Anchor: FC<JSX.InstrinsicElements['a']> = ({ children, href, ...props }) => (
  <Link to={href} className="docs-link" {...props}>
    {children}
  </Link>
);

const Ul: FC<JSX.IntrinsicElements['ul']> = ({ children, ...props }) => (
  <ul className="ui-text-p2 pl-16 pb-32 list-disc" {...props}>
    {children}
  </ul>
);

const Li: FC<JSX.IntrinsicElements['li']> = ({ children, ...props }) => (
  <li className="ui-text-p2" {...props}>
    {children}
  </li>
);

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  p: Paragraph,
  a: Anchor,
  ul: Ul,
  li: Li,
};

export const MarkdownProvider = ({ children }: { children: React.ReactNode }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);
