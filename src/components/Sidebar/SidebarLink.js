import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { SidebarHeadingStyle } from './styles';
import { ChildPropTypes } from '../../react-utilities';

const onPageNav = /[#?]/;

const SidebarGatsbyLink = styled(Link)`
  ${SidebarHeadingStyle}
`;
const SidebarAnchor = styled.a`
  ${SidebarHeadingStyle}
`;

const SidebarLink = ({ to, children, ...props }) =>
  onPageNav.test(to) ? (
    /**
     *  Relevant page of documentation: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#recommendations-for-programmatic-in-app-navigation
     *  "If you need this (in-app navigation) behavior, you should either use an anchor tag or import the navigate helper from gatsby"
     */
    <SidebarAnchor href={to} {...props}>
      {children}
    </SidebarAnchor>
  ) : (
    <SidebarGatsbyLink to={to} {...props}>
      {children}
    </SidebarGatsbyLink>
  );

SidebarLink.propTypes = {
  to: PropTypes.string,
  children: ChildPropTypes,
};

export default SidebarLink;
