import React from 'react';
import Icon from '@ably/ui/core/Icon';

type OpenChatButtonProps = {
  label: string;
  labelWhenInactive: string;
  options: {
    withIcon: boolean;
  };
};

const OpenChatButton = ({ label, labelWhenInactive, options: { withIcon } }: OpenChatButtonProps) => (
  <button
    type="button"
    className="ui-btn-secondary-invert"
    disabled
    data-id="open-chat-widget"
    data-enabled-label={label}
    data-disabled-label={labelWhenInactive}
  >
    {withIcon && <Icon name="icon-gui-live-chat" size="1.5rem" color="ui-btn-icon" />}
    {labelWhenInactive}
  </button>
);

export default OpenChatButton;
