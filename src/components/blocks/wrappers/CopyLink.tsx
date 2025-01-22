import React, { ReactNode, useState } from 'react';
import cn from '@ably/ui/core/utils/cn';
import Icon from '@ably/ui/core/Icon';

import {
  button,
  buttonContainer,
  childrenContainer,
  container,
  isHidden,
  isVisible,
  notificationContainer,
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
        <a href={`#${attribs.id}`}>{children}</a>
        <div className={cn(buttonContainer, marginTop)}>
          <button
            onClick={handleCopyLink}
            className={cn(button, {
              [isHidden]: notificationIsVisible,
            })}
          >
            <Icon name="icon-gui-link-micro" size="1rem" />
          </button>
        </div>
        <div
          className={cn(notificationContainer, {
            [isVisible]: notificationIsVisible,
          })}
        >
          Copied!
        </div>
      </div>
    </div>
  );
};

export default CopyLink;
