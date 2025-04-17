import { useEffect, useState } from 'react';
import { ChatClient, AllFeaturesEnabled, Reaction as ReactionInterface } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider, useRoom, useRoomReactions } from '@ably/chat/react';
import { Realtime } from 'ably';
import './styles/styles.css';

const mockNames = ['Bob', 'Jane', 'John', 'Sammy'];
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

const realtimeClient = new Realtime({ key: import.meta.env.VITE_ABLY_KEY, clientId: mockName() });
const chatClient = new ChatClient(realtimeClient);

function Chat() {
  const [reactions, setReactions] = useState<ReactionInterface[]>([]);
  const emojis = ['❤️', '😲', '👍', '😊'];

  const { send } = useRoomReactions({
    listener: (reaction) => {
      setReactions((prevReactions: ReactionInterface[]) => [...prevReactions, { ...reaction }]);

      setTimeout(() => {
        setReactions((prevReactions) => prevReactions.filter((r) => r.createdAt !== reaction.createdAt));
      }, 4000);
    },
  });

  return (
    <div id="chat-room-reactions" className="container">
      <div className="flex-1 p:2 sm:p-12 justify-between flex flex-col h-screen">
        <div
          id="messages"
          className="w-96 flex flex-auto flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        ></div>
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="emoji-selector">
            {emojis.map((emoji, index) => (
              <span key={index} className="emoji-btn" onClick={() => send({ type: emoji })}>
                {emoji}
              </span>
            ))}
          </div>
          <div className="absolute right-0 bottom-[100px] mb-2 mr-2">
            <div className="reaction-container">
              <div className="reaction-area">
                {reactions.map((reaction, index) => (
                  <span key={index} className="reaction">
                    {reaction.type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <form className="flex">
            <input
              type="text"
              disabled={true}
              placeholder="Start typing..."
              className="uk-input uk-width-1-1 uk-border-rounded-left"
              autoFocus
            />
            <div className="items-center inset-y-0 flex ml-2">
              <button disabled={true} type="submit" className="uk-btn uk-btn-primary uk-border-rounded-right">
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

function ChatRoomReactionsDemo() {
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
  const [roomName, setRoomName] = useState('chat-room-reactions');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name !== null) {
      setRoomName(name);
    }
  }, []);

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider id={roomName} options={AllFeaturesEnabled}>
        <ChatRoomReactionsDemo />
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}
