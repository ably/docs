import React, { ReactNode, useState } from 'react';
import cn from 'classnames';
import Icon from '@ably/ui/core/Icon';

import {
  button,
  buttonContainer,
  childrenContainer,
  container,
  isHidden,
  isVisible,
  notification,
} from './CopyLink.module.css';

const CopyLink = ({
  attribs,
  marginBottom = '',
  marginTop = '',
  children,
}: {
  attribs?: { id?: string };
  marginBottom?: string;
  marginTop?: string;
  children: ReactNode;
}) => {
  const [notificationIsVisible, setNotificationIsVisible] = useState(false);

  if (!attribs || !attribs.id) {
    return <>{children}</>;
  }

  const handleCopyLink = () => {
    const linkToCopy = `${window.location.href.replace(/#.*$/, '')}#${attribs.id}`;
    navigator.clipboard.writeText(linkToCopy);
    setNotificationIsVisible(true);
    setTimeout(() => {
      setNotificationIsVisible(false);
    }, 1000);
  };

  return (
    <div className={cn('copy-link-identifier', container, marginBottom)}>
      <div className={childrenContainer}>
        {children}
        <div className={cn(buttonContainer, marginTop)}>
          <div
            className={cn(notification, {
              [isVisible]: notificationIsVisible,
            })}
          >
            Copied!
          </div>
          <button
            onClick={handleCopyLink}
            className={cn(button, {
              [isHidden]: notificationIsVisible,
            })}
          >
            <Icon name="icon-gui-link" size="1rem" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyLink;
