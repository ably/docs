import { useState, useCallback, useEffect } from 'react';
import { useTyping } from '@ably/chat/react';
import { TypingEvent } from '@ably/chat';

export const ChatInput = () => {
  const [isTyping, setIsTyping] = useState(false);

  const {start, stop, currentlyTyping } = useTyping({
    listener: (typingEvent: TypingEvent) => {
      console.log('Typing event received: ', typingEvent);
    },
  });

  const handleTyping = useCallback(() => {
    if (!isTyping) {
      setIsTyping(true);
      start();
    }

    const timer = setTimeout(() => {
      setIsTyping(false);
      stop();
    }, 5000);

    return () => clearTimeout(timer);
  }, [isTyping, start, stop]);

  useEffect(() => {
    if (!isTyping) {
      stop();
    }
  }, [isTyping, stop]);

  let clientsTyping = '';
  const clientIdsArray = Array.from(currentlyTyping);

  for (let i = 0; i < clientIdsArray.length; i++) {
    clientsTyping += clientIdsArray[i];
    if (i !== clientIdsArray.length - 1) {
      clientsTyping += ' and ';
    }
  }

  const typingIndicatorText = clientIdsArray.length > 0
    ? `${clientsTyping} ${clientIdsArray.length === 1 ? 'is' : 'are'} typing`
    : '';

  return (
    <div id="typing-indicator" className="container">
      <div className="inner">
        <input
          type="text"
          id="user-input"
          placeholder="Start typing..."
          onKeyDown={handleTyping}
        />
        <label id="user-input-label" htmlFor="user-input">
          {typingIndicatorText}
        </label>
      </div>
    </div>
  );
}
