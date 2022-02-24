import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const A = ({ data, attribs }) => {
  if (attribs.href && /^(\/|#|https?:\/\/(?:www.)?ably.com\/documentation).*/.test(attribs.href)) {
    return (
      <Link {...{ ...attribs, to: attribs.href }}>
        <Html data={data} />
      </Link>
    );
  }
  return GenericHtmlBlock('a')({ data, attribs });
};

A.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default A;
