import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import { checkLinkIsInternal } from './blocks/external-references/AElementHelpers/check-link-is-internal';

export default function Link<TState>({ children, to, ...props }: React.PropsWithoutRef<GatsbyLinkProps<TState>>) {
  const internal = checkLinkIsInternal(to);
  const onPageNav = /[#?]/;

  return onPageNav.test(to) || !internal ? (
    /**
     *  Relevant page of documentation: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#recommendations-for-programmatic-in-app-navigation
     *  "If you need this (in-app navigation) behavior, you should either use an anchor tag or import the navigate helper from gatsby"
     */
    <a href={to} data-testid="link-external" {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to} data-testid="link-internal" {...props}>
      {children}
    </GatsbyLink>
  );
}
