import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';

import '@ably/ui/core/styles.css';

const onPageNav = /[#?]/;

// eslint-disable-next-line react/prop-types
const StyledGatsbyLink = ({ children, ...props }) => (
  <Link className="ui-link" {...props}>
    {children}
  </Link>
);

const A = ({ data, attribs }) => {
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
      <StyledGatsbyLink {...{ ...attribs, to: href }}>
        <Html data={data} />
      </StyledGatsbyLink>
    );
  }
  return GenericHtmlBlock('a')({ data, attribs: { ...attribs, className: 'ui-link' } });
};

A.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default A;
