import React, { useEffect, useState } from 'react';
import Icon from '@ably/ui/core/Icon';

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

const ACTIVE = true;
const INACTIVE = false;

const MAX_RETRY_COUNT = 20;

// const toggleChatWidget = (params = {}) {
//   const { dataId, withIcon } = params;
//   const container = queryId(dataId);
//   const chatButton = queryId('open-chat-widget', container);
//   const textEnabled = chatButton.dataset.enabledLabel;
//   const textDisabled = chatButton.dataset.disabledLabel;

//   if (!dataId || !container) return;
//   const trigger = queryId('open-chat-widget', container);

//   let clickHandler;

//   const waitForScript = (delay) => {
//     const widget = window?.HubSpotConversations?.widget;

//     // If the chat is set to be hidden out of hours this will return null
//     const iframe = document.querySelector('#hubspot-messages-iframe-container');

//     clickHandler = (e) => {
//       e.preventDefault();
//       widget.open();
//     };

//     if (widget && iframe) {
//       trigger.addEventListener('click', clickHandler);
//       enableBtn(trigger, textEnabled, withIcon);
//     } else if (--MAX_RETRY_COUNT > 0) {
//       setTimeout(() => waitForScript(WAIT_BETWEEN_RETRIES_MS), delay);
//     }
//   };

//   disableBtn(trigger, textDisabled, withIcon);
//   waitForScript(0);

//   return () => {
//     disableBtn(trigger, textDisabled, withIcon);
//     trigger.removeEventListener('click', clickHandler);
//   };
// }

const OpenChatButton = ({ label, labelWhenInactive, options: { withIcon } }: OpenChatButtonProps) => {
  const [status, setStatus] = useState(INACTIVE);
  const [selectedLabel, setSelectedLabel] = useState(labelWhenInactive);

  const enableChatButton: () => void = () => {
    setStatus(ACTIVE);
    setSelectedLabel(label);
  };

  useEffect(() => {
    const safeWindow = (
      typeof window === 'undefined' ? { HubSpotConversations: undefined, hsConversationsOnReady: [] } : window
    ) as Window;

    const widget = safeWindow.HubSpotConversations?.widget;

    // If the chat is set to be hidden out of hours this will return null
    const iframe = document.querySelector('#hubspot-messages-iframe-container');
    if (iframe) {
      if (widget) {
        enableChatButton();
      } else {
        if (safeWindow.hsConversationsOnReady) {
          safeWindow.hsConversationsOnReady.push(enableChatButton);
        } else {
          safeWindow.hsConversationsOnReady = [enableChatButton];
        }
      }
    }
  });
  return (
    <button type="button" className="ui-btn-secondary-invert" disabled={status} data-id="open-chat-widget">
      {withIcon && <Icon name="icon-gui-live-chat" size="1.5rem" color="ui-btn-icon" />}
      {selectedLabel}
    </button>
  );
};
export default OpenChatButton;
