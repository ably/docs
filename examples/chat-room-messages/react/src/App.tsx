import React, { useEffect, useState } from 'react';
import {
  Message,
  ChatClient,
} from '@ably/chat';
import {
  useRoom,
  useMessages,
  useChatClient,
  ChatClientProvider,
  ChatRoomProvider,
} from '@ably/chat/react';
import { Realtime } from 'ably';
import './styles/styles.css';

const mockNames = ['Bob', 'Jane', 'John', 'Sammy'];
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

const realtimeClient = new Realtime({ key: import.meta.env.VITE_ABLY_KEY, clientId: mockName() });
const chatClient = new ChatClient(realtimeClient);

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const { clientId } = useChatClient();
  const { send } = useMessages({
    listener: (message: Message) => {
      setMessages((prevMessages: Message[]) => [...prevMessages, message.message]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send({ text: message });
    setMessage('');
  };

  return (
    <div id="chat-room-reactions" className="container">
      <div className="flex-1 p:2 pl-4 sm:p-12 justify-between flex flex-col h-screen uk-text-primary">
        <div
          id="messages"
          className="w-80 flex flex-auto flex-col space-y-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messages.map((message, index) => (
            <div key={index} className="flex items-start">
              <span className={`font-bold ${message.clientId === clientId ? 'text-grey-500' : 'text-blue-500'} mr-2`}>
                {message.clientId === clientId ? 'You' : message.clientId}:
              </span>
              <span className="text-gray-700">{message.text}</span>
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
              className="uk-input uk-width-1-1"
              autoFocus
            />
            <div className="items-center inset-y-0 flex ml-2">
              <button type="submit" className="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-[1998px] w-full hover:uk-btn-primary+1 active:uk-btn-primary+2">
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
};

function ChatRoomMessagesDemo() {
  const { roomStatus, connectionStatus } = useRoom();

  if (roomStatus !== 'attached' || connectionStatus !== 'connected') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Chat />
    </div>
  );
}

export default function App() {
  const [roomName, setRoomName] = useState('chat-room-messages');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name !== null) {
      setRoomName(name);
    }
  }, []);

  return (
    <div className="min-h-screen">
      <ChatClientProvider client={chatClient}>
        <ChatRoomProvider id={roomName}>
          <ChatRoomMessagesDemo />
        </ChatRoomProvider>
      </ChatClientProvider>
    </div>
  );
}
