import React, { useState } from 'react';
import cn from '@ably/ui/core/utils/cn';
import { Link } from 'gatsby';
import Icon from '@ably/ui/core/Icon';

export enum NotificationVariant {
  Warning = 'Warning',
}

type Props = { message: string; href: string; linkText: string; className?: string; variant: NotificationVariant };

export const Notification = ({
  message,
  href,
  linkText,
  className = '',
  variant = NotificationVariant.Warning,
}: Props) => {
  const [isVisible, setVisible] = useState(true);

  const handleDismiss = () => setVisible(false);

  return isVisible ? (
    <div
      className={cn(
        'py-6 px-12 w-full col-span-3 hidden md:flex text-white relative items-center justify-center rounded ui-text-menu3',
        {
          'bg-active-orange': variant === NotificationVariant.Warning,
        },
        className,
      )}
    >
      <div>
        <span className="font-medium">{variant}:</span>
        <span>{message}</span>{' '}
        <Link to={href}>
          <span className="underline inline">{linkText}</span>
        </Link>
      </div>
      <button type="button" className="text-black ml-12 flex items-center" onClick={handleDismiss} aria-label="Close">
        <Icon name="icon-gui-x-mark-outline" size="16px" />
      </button>
    </div>
  ) : null;
};
