import { GatsbyLinkProps, Link } from 'gatsby';
import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';
import { HtmlComponentProps } from '../../html-component-props';

import './styles.css';

const onPageNav = /[#?]/;

const StyledGatsbyLink = ({ to, children, ...props }: Omit<GatsbyLinkProps<Record<string, unknown>>, 'ref'>) => (
  <Link className="docs-link" to={to} {...props}>
    {children}
  </Link>
);

const A = ({ data, attribs }: HtmlComponentProps<'a'>): ReactElement => {
  if (
    attribs.href &&
    /^(\/|#|https?:\/\/(?:www.)?ably.com\/docs).*/.test(attribs.href) &&
    !onPageNav.test(attribs.href)
  ) {
    let href = attribs.href;
    if (/^\/(?!docs\/).*/.test(attribs.href)) {
      href = `/${DOCUMENTATION_NAME}${attribs.href}`;
    }
    return (
      <StyledGatsbyLink to={href} {...{ ...attribs }}>
        <Html data={data} />
      </StyledGatsbyLink>
    );
  }
  return GenericHtmlBlock('a')({ data, attribs: { ...attribs, className: 'docs-link' } });
};

A.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default A;
