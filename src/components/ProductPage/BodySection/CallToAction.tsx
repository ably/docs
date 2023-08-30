import React from 'react';
import Icon from '@ably/ui/core/Icon';
import Link from '../../Link';
import { CallToActionProps } from '../ProductPageContent';

export const CallToAction = ({ callToAction }: { callToAction: CallToActionProps }) => {
  return (
    <div className="h-full flex">
      {callToAction.type === 'link' && (
        <div className="flex">
          <Link to={callToAction.href} className="mr-4 docs-link font-medium">
            {callToAction.text}
          </Link>
          <Icon name="icon-gui-arrow-right" size="1rem" />
        </div>
      )}
      {callToAction.type === 'button' && (
        <Link
          to={callToAction.href}
          className="ui-btn-secondary ml-auto docs-link font-medium"
          style={{ padding: '0.625rem 1.25rem', borderColor: 'var(--color-mid-grey)' }}
        >
          {callToAction.text}
          <Icon name="icon-gui-arrow-right" size="1rem" class="ml-4" />
        </Link>
      )}
    </div>
  );
};
