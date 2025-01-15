import { Link as GatsbyLink, GatsbyLinkProps, navigate as GatsbyNavigate } from 'gatsby';
import { safeWindow } from 'src/utilities';
import { checkLinkIsInternal, localizeLink } from 'src/utilities/link-checks';

export default function Link<TState>({ children, to, ...props }: React.PropsWithoutRef<GatsbyLinkProps<TState>>) {
  const isInternal = checkLinkIsInternal(to);
  const isOnPage = to?.startsWith('#');

  /**
   *  Relevant page of documentation: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/#recommendations-for-programmatic-in-app-navigation
   *  "If you need this (in-app navigation) behavior, you should either use an anchor tag or import the navigate helper from gatsby"
   */
  if (isInternal && !isOnPage) {
    // Strip noreferrer from the rel if it is a local link
    const { rel } = props;
    if (rel !== undefined) {
      const keep = rel
        .split(' ')
        .filter((value) => value !== 'noreferrer')
        .join(' ');
      if (keep.length > 0) {
        props.rel = keep;
      } else {
        delete props.rel;
      }
    }

    return (
      <GatsbyLink to={localizeLink(to)} data-testid="link-internal" {...props}>
        {children}
      </GatsbyLink>
    );
  }

  // add noreferrer to extenal links that open in new windows
  const { target } = props;
  if (target && target === '_blank') {
    const { rel } = props;
    const newRel = new Set((rel ?? '').split(' '));
    newRel.delete('');
    newRel.add('noreferrer');
    newRel.add('noopener');
    props.rel = [...newRel].join(' ');
  }

  return (
    <a href={to} data-testid="link-external" {...props}>
      {children}
    </a>
  );
}

/**
 * A thin wrapper around Gatsby's navigate that is aware of external links, and will
 * directly manipulate the location in the event of being passed an external link
 */
interface NavigateOptions {
  replace?: boolean;
  state?: Record<string, unknown>;
}

export function navigate(to: string, options: NavigateOptions = {}): Promise<void> {
  const isInternal = checkLinkIsInternal(to);
  const isOnPage = to?.startsWith('#');
  const formattedTo = localizeLink(to);

  if (isInternal && !isOnPage) {
    return GatsbyNavigate(formattedTo, options);
  }

  safeWindow.location.assign(formattedTo);
  return Promise.resolve();
}
