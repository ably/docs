"use client";

import { useRoom } from '@ably/chat/react';
import { Reaction as EmojiReaction } from "@/components/Reaction";
import '../../styles/global.css'

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
  return (
    <div id="chat-room-reactions" className="container">
       <div className="flex-1 p:2 sm:p-12 justify-between flex flex-col h-screen">
        <div
          id="messages"
          className="w-96 flex flex-auto flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
        </div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <form
            className="flex"
          >
            <input
              type="text"
              disabled={true}
              placeholder="Type something..."
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 pr-2 bg-gray-200 rounded-l-md py-1 disabled:cursor-not-allowed disabled:italic"
              autoFocus
            />
            <div className="items-center inset-y-0 flex">
              <button
                disabled={true}
                type="submit"
                className="inline-flex items-center justify-center rounded-r-md px-3 py-1 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
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
          <div className="absolute bottom-0 right-0 mb-2 mr-2">
            <EmojiReaction />
          </div>
        </div>
      </div>
    </div>
  );
}
