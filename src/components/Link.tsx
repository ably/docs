import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { checkLinkIsInternal } from './blocks/external-references/AElementHelpers/check-link-is-internal';

const Link = ({ children, to, ...props }: { children: React.ReactNode; to: string }) => {
  const internal = checkLinkIsInternal(to);
  const onPageNav = /[#?]/;

  return onPageNav.test(to) || !internal ? (
    /**
     *  Relevant page of documentation: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#recommendations-for-programmatic-in-app-navigation
     *  "If you need this (in-app navigation) behavior, you should either use an anchor tag or import the navigate helper from gatsby"
     */
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  );
};

export default Link;
