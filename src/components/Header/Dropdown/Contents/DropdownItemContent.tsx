import React from 'react';
import { navigate } from 'src/components/Link';
import { ContentDescription } from './ContentDescription';
import { ContentLink } from './ContentLink';
import { Content } from './types';

export const DropdownItemContent = ({ content: { link, description } }: { content: Content }) => {
  return (
    <li
      className="flex flex-col hover:bg-light-grey p-8 mr-16 -ml-8 rounded-md cursor-pointer group"
      onClick={() => navigate(link.href, { external: link.external })}
      onKeyDown={(event) => event.key === 'Enter' && navigate(link.href, { external: link.external })}
      tabIndex={0}
    >
      <ContentLink href={link.href} rel={link.rel} text={link.text} external={link.external} />
      <ContentDescription>{description}</ContentDescription>
    </li>
  );
};
