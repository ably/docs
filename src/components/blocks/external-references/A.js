import { Link } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';
import styled, { css } from 'styled-components';
import { secondary } from '../../../styles/colors';
import { DOCUMENTATION_NAME } from '../../../../data/transform/constants';

const onPageNav = /[#?]/;

const styles = css`
  color: revert;
  :hover {
    color: ${secondary.actionBlue};
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
  return GenericHtmlBlock(StyledALink)({ data, attribs });
};

A.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  attribs: PropTypes.object,
};

export default A;
