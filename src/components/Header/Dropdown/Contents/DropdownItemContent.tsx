import React from 'react';
import { navigate, withPrefix } from 'gatsby';
import { checkLinkIsInternal } from 'src/utilities/link-checks';
import { ContentDescription } from './ContentDescription';
import { ContentLink } from './ContentLink';
import { Content } from './types';

export const DropdownItemContent = ({ content: { link, description } }: { content: Content }) => {
  const isInternal = checkLinkIsInternal(link.href);
  const href = isInternal && link.external ? withPrefix(link.href) : link.href;

  return (
    <li
      className="flex flex-col hover:bg-light-grey p-8 mr-16 -ml-8 rounded-md cursor-pointer group"
      onClick={() => navigate(href)}
      onKeyDown={(event) => event.key === 'Enter' && navigate(href)}
      tabIndex={0}
    >
      <ContentLink href={link.href} rel={link.rel} text={link.text} external={link.external} />
      <ContentDescription>{description}</ContentDescription>
    </li>
  );
};
