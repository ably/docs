"use client";

import { useRoom, useMessages, useChatClient } from '@ably/chat/react';
import { Message } from '@ably/chat';
import { useState } from 'react';
import '../../styles/styles.css'

export default function Home() {
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
       <div className="flex-1 p:2 sm:p-12 justify-between flex flex-col h-screen">
       <div
          id="messages"
          className="w-96 flex flex-auto flex-col space-y-2 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {messages.map((message, index) => (
            <div key={index} className="flex items-start">
              <span className={`font-bold ${message.clientId === clientId ? "text-grey-500" : "text-blue-500"} mr-2`}>
              {message.clientId === clientId ? "You" : message.clientId}:
              </span>
              <span className="text-gray-700">
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <form
            className="flex"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Type something..."
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 pr-2 bg-gray-200 rounded-l-md py-1 italic"
              autoFocus
            />
            <div className="items-center inset-y-0 flex">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-r-md px-3 py-1 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
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
