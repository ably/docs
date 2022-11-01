import Icon from '@ably/ui/core/Icon';
import React from 'react';

export const FooterSocial = ({ label, link }: { label: string; link: string }) => {
  return (
    <a className="h-24 pr-24 text-cool-black hover:text-active-orange" href={link}>
      <Icon name={label} size="1.5rem" />
    </a>
  );
};
