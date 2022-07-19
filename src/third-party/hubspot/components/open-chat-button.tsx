import React, { useEffect, useState } from 'react';
import Icon from '@ably/ui/core/Icon';
import { identity } from 'lodash';

declare global {
  interface Window {
    HubSpotConversations?: {
      widget: {
        open: () => void;
      };
    };
    hsConversationsOnReady?: (() => void)[];
  }
}

type OpenChatButtonProps = {
  label: string;
  labelWhenInactive: string;
  options: {
    withIcon: boolean;
  };
};

const safeWindow = (
  typeof window === 'undefined' ? { HubSpotConversations: undefined, hsConversationsOnReady: [] } : window
) as Window;

const OpenChatButton = ({ label, labelWhenInactive, options: { withIcon } }: OpenChatButtonProps) => {
  const [isActive, setIsActive] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(labelWhenInactive);
  const [clickHandler, setClickHandler] = useState(identity);

  const activateChatButton: () => void = () => {
    setIsActive(true);
    setSelectedLabel(label);
    setClickHandler((event) => {
      const widget = safeWindow.HubSpotConversations?.widget;
      if (widget) {
        widget.open();
      } else {
        console.warn('HubSpot Conversation widget not found.');
      }
      return event;
    });
  };

  const deActivateChatButton: () => void = () => {
    setIsActive(false);
    setSelectedLabel(labelWhenInactive);
    setClickHandler(identity);
  };

  useEffect(() => {
    const widget = safeWindow.HubSpotConversations?.widget;

    // If the chat is set to be hidden out of hours this will return null
    const iframe = document.querySelector('#hubspot-messages-iframe-container');
    if (iframe) {
      if (widget) {
        activateChatButton();
      } else {
        if (safeWindow.hsConversationsOnReady) {
          safeWindow.hsConversationsOnReady.push(activateChatButton);
        } else {
          safeWindow.hsConversationsOnReady = [activateChatButton];
        }
      }
    } else {
      deActivateChatButton();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      className="ui-btn-secondary-invert"
      disabled={isActive}
      data-id="open-chat-widget"
      onClick={clickHandler}
    >
      {withIcon && <Icon name="icon-gui-live-chat" size="1.5rem" color="ui-btn-icon" />}
      {selectedLabel}
    </button>
  );
};
export default OpenChatButton;
