import { GatsbyLinkProps, Link } from 'gatsby';
import React, { ReactElement } from 'react';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';
import { HtmlComponentProps } from '../../html-component-props';

import './styles.css';

const StyledGatsbyLink = ({ to, children, ...props }: Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>) => (
  <Link className="docs-link" to={to} {...props}>
    {children}
  </Link>
);

const A = ({ data, attribs }: HtmlComponentProps<'a'>): ReactElement => {
  const rawHref = attribs?.href;
  if (rawHref && /^(\/|https?:\/\/(?:www.)?ably.com\/docs).*/.test(rawHref)) {
    let href = rawHref;
    if (/^\/(?!docs\/).*/.test(rawHref)) {
      href = `/${DOCUMENTATION_NAME}${rawHref}`;
    }
    return (
      <StyledGatsbyLink to={href} {...{ ...attribs }}>
        <Html data={data} />
      </StyledGatsbyLink>
    );
  }
  return GenericHtmlBlock('a')({ data, attribs: { ...attribs, className: 'docs-link' } });
};

export default A;
