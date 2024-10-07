import { useTyping, } from '@ably/chat/react';

export const ChatInput = () => {
  const {start, currentlyTyping } = useTyping();

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
          onKeyDown={start}
        />
        <label id="user-input-label" htmlFor="user-input">
          {typingIndicatorText}
        </label>
      </div>
    </div>
  );
}
