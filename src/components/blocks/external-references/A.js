import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

import '@ably/ui/core/styles.css';

const onPageNav = /[#?]/;

// eslint-disable-next-line react/prop-types
const StyledGatsbyLink = ({ props, children }) => (
  <Link className="ui-link" {...props}>
    {children}
  </Link>
);

const A = ({ data, attribs }) => {
  if (
    attribs.href &&
    /^(\/|#|https?:\/\/(?:www.)?ably.com\/documentation).*/.test(attribs.href) &&
    !onPageNav.test(attribs.href)
  ) {
    return (
      <StyledGatsbyLink {...{ ...attribs, to: attribs.href }}>
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
