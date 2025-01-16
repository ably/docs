"use client";

import { useChatClient, useRoom, useTyping } from '@ably/chat';
import '../../styles/styles.css'

const Loading = () => <div>Loading...</div>;

const ChatInput = () => {
  const {start, currentlyTyping } = useTyping();
  const { clientId } = useChatClient();

  const typingClientIds = Array.from(currentlyTyping).filter((id) => id !== clientId);
  const clientsTyping = typingClientIds.join(' and ');
  const typingIndicatorText = clientsTyping ? `${clientsTyping} ${typingClientIds.length === 1 ? 'is' : 'are'} typing` : '';

  return (
    <div id="typing-indicator" className="container">
      <div className="inner">
        <input
          type="text"
          id="user-input"
          placeholder="Start typing..."
          onKeyDown={start}
        />
        <label id="user-input-label" htmlFor="user-input">
          {typingIndicatorText}
        </label>
      </div>
    </div>
  );
}

export default function ChatApp() {
  const { roomStatus, connectionStatus } = useRoom();

  if (roomStatus !== 'attached' || connectionStatus !== 'connected') {
    return <Loading />;
  }

  return (
    <div>
      <ChatInput />
    </div>
  );
}
