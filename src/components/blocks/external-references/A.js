import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import styled, { css } from 'styled-components';
import { secondary } from '../../../styles/colors';

const onPageNav = /[#?]/;

const styles = css`
  color: revert;
  :hover {
    color: ${secondary.black};
  }
`;

const StyledGatsbyLink = styled(Link)`
  ${styles}
`;

const StyledALink = styled.a`
  ${styles}
`;

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
  return GenericHtmlBlock(StyledALink)({ data, attribs });
};

A.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default A;
