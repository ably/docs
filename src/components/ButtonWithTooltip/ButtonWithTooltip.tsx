import React, { HTMLAttributes, MouseEvent, useState, useRef } from 'react';
import cn from '@ably/ui/core/utils/cn';
import { button, tooltipClass, isVisible, notificationClass } from './ButtonWithTooltip.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  tooltip: string;
  notification?: string;
}

const ButtonWithTooltip = ({ tooltip, notification, children, onClick, className, ...buttonProps }: Props) => {
  const [notificationIsVisible, setNotificationIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
      setNotificationIsVisible(true);
      setTimeout(() => {
        setNotificationIsVisible(false);
        // NOTE: since we're controlling some state with :focus css, we need to unfocus to let the tooltip show again
        if (buttonRef.current) {
          buttonRef.current.blur();
        }
      }, 1000);
    }
  };

  return (
    <div className="relative">
      <button type="button" {...buttonProps} onClick={handleClick} className={cn(button, className)} ref={buttonRef}>
        {children}
      </button>
      <div className={tooltipClass} role="tooltip">
        <span>{tooltip}</span>
      </div>
      {notification && (
        <div
          className={cn(notificationClass, {
            [isVisible]: notificationIsVisible,
          })}
        >
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
};

export default ButtonWithTooltip;
