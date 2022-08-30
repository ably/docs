import React, { HTMLAttributes, MouseEvent, useState } from 'react';

import { button, tooltipClass } from './ButtonWithTooltip.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  tooltip: string;
  notification?: string;
}

const ButtonWithTooltip = ({ tooltip, notification, children, onClick, ...buttonProps }: Props) => {
  const [notificationVisible, setNotificationVisible] = useState(false);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button type="button" {...buttonProps} onClick={handleClick} className={button}>
      <span className={tooltipClass}>{tooltip}</span>
      {notificationVisible && notification && <span className={tooltipClass}>{notification}</span>}
      {children}
    </button>
  );
};

export default ButtonWithTooltip;
