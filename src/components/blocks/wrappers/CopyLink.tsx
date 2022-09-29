import React, { ReactNode, MouseEvent, useState } from 'react';
import cn from 'classnames';
import Icon from '@ably/ui/core/Icon';

import AILink from '../../../styles/svg/ai-link';

import { container, button, isHidden, isVisible, notification, buttonContainer } from './CopyLink.module.css';

const CopyLink = ({
  attribs,
  marginBottom = '',
  children,
}: {
  attribs?: { id?: string };
  marginBottom?: string;
  children: ReactNode;
}) => {
  const [notificationIsVisible, setNotificationIsVisible] = useState(false);

  if (!attribs || !attribs.id) {
    return <>{children}</>;
  }

  const handleCopyLink = (e: MouseEvent<HTMLButtonElement>) => {
    const linkToCopy = `${window.location.href.replace(/#.*$/, '')}#${attribs.id}`;
    navigator.clipboard.writeText(linkToCopy);
    setNotificationIsVisible(true);
    setTimeout(() => {
      setNotificationIsVisible(false);
    }, 1000);
  };

  return (
    <div className={cn(container, marginBottom)}>
      {children}
      <div className={buttonContainer}>
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
  );
};

export default CopyLink;
