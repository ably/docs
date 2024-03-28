import React from 'react';
import Icon from '@ably/ui/core/Icon';
import Link from '../../Link';

export const CallToAction = ({ text, href }: { text: string; href: string }) => {
  return (
    <div className="flex justify-center mt-40">
      <Link to={href} className="ui-btn font-medium">
        {text}
        <Icon name="icon-gui-arrow-right" size="1rem" additionalCSS="ml-4" />
      </Link>
    </div>
  );
};
