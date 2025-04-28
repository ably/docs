import { Message } from '@ably/chat';
import { useChatClient, useMessages } from '@ably/chat/react';
import { useState } from 'react';
import './styles/styles.css';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const { clientId } = useChatClient();
  const { get, send } = useMessages({
    listener: (event) => {
      setMessages((prevMessages: Message[]) => [...prevMessages, event.message]);
    },
  });

  const getPastMessages = () => {
    get({ limit: 10 }).then((result) => {
      result.items.forEach((message) => {
        const messageExists = messages.some((prevMessage) => prevMessage.serial === message.serial);

        if (messageExists) {
          return messages;
        }

        setMessages((prevMessages: Message[]) => {
          return [message, ...prevMessages];
        });
      });
      const loadButton = document.getElementById('load-past-messages');
      if (loadButton instanceof HTMLButtonElement) {
        loadButton.disabled = true;
        loadButton.className =
          'uk-btn uk-btn-sm mb-1 rounded-[1998px] border border-black bg-transparent text-black cursor-not-allowed hover:uk-btn-primary+1 active:uk-btn-primary+2 absolute top-2 left-1/2 transform -translate-x-1/2 p-2 cursor-not-allowed';
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send({ text: message });
    setMessage('');
  };

  return (
    <div id="chat-room-messages" className="w-full flex justify-center items-center relative bg-[#f4f8fb] h-screen uk-text-primary">
      <div className="flex-1 p:2 sm:p-12 justify-between flex flex-col h-screen">
        <div
          id="messages"
          className="w-96 flex flex-auto flex-col space-y-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          <button
            id="load-past-messages"
            className="uk-btn uk-btn-sm uk-btn-primary mb-2 rounded-[1998px] absolute top-2 left-1/2 transform -translate-x-1/2 p-2 hover:uk-btn-primary+1 active:uk-btn-primary+2"
            onClick={getPastMessages}
          >
            ↑ Load previous messages
          </button>
          {messages.map((message, index) => (
            <div key={index} className="flex items-start">
              <span className={`font-bold ${message.clientId === clientId ? 'text-grey-500' : 'text-blue-500'} mr-2`}>
                {message.clientId === clientId ? 'You' : message.clientId}:
              </span>
              <span className="uk-text-primary">{message.text}</span>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Type something..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="uk-input uk-width-1-1 uk-border-rounded-left"
              autoFocus
            />
            <div className="items-center inset-y-0 flex ml-2">
              <button
                type="submit"
                className="uk-btn uk-btn-primary rounded-[1998px] hover:uk-btn-primary+1 active:uk-btn-primary+2"
              >
                Send
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
