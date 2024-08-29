import React from 'react';
import { withPrefix } from 'gatsby';
import FeaturedLink from '@ably/ui/core/FeaturedLink';
import { DropdownContentLink } from '../Contents';
import { checkLinkIsInternal, normalizeLegacyDocsLink } from 'src/utilities/link-checks';

export const MaybeShowSummaryLink = ({ summaryLink }: { summaryLink?: DropdownContentLink }) => {
  if (!summaryLink) {
    return <div></div>;
  }

  let href = summaryLink.href;
  const isInternal = checkLinkIsInternal(href);
  const isOnPage = href?.startsWith('#');

  if (isInternal && !isOnPage) {
    href = withPrefix(normalizeLegacyDocsLink(href));
  }

  return (
    <div className="h-full px-32 pt-32 relative z-1">
      <FeaturedLink url={href}>
        <span className="text-gui-default text-menu2 font-bold">{summaryLink.text}</span>
      </FeaturedLink>
    </div>
  );
};
