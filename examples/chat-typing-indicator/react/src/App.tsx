import { useEffect, useState } from 'react';
import {
  TypingEvent,
  ChatClient  ,
  AllFeaturesEnabled,
  TypingOptions,
} from '@ably/chat';
import {
  useTyping,
  useChatClient,
  useRoom,
  ChatClientProvider,
  ChatRoomProvider,
} from '@ably/chat/react';
import { Realtime } from 'ably';
import './styles/styles.css';

const mockNames = ['Bob', 'Jane', 'John', 'Sammy'];
const mockName = () => mockNames[Math.floor(Math.random() * mockNames.length)];

const realtimeClient = new Realtime({ key: import.meta.env.VITE_ABLY_KEY, clientId: mockName() });
const chatClient = new ChatClient(realtimeClient);

const typingOptions: TypingOptions = {
  timeoutMs: 5000,
};

const Loading = () => <div>Loading...</div>;

const ChatInput = () => {
  const { start, currentlyTyping } = useTyping({
    listener: (typingEvent: TypingEvent) => {
      console.log('Typing event received: ', typingEvent);
    },
  });
  const { clientId } = useChatClient();

  const typingClientIds = Array.from(currentlyTyping).filter((id) => id !== clientId);
  const clientsTyping = typingClientIds.join(' and ');
  const typingIndicatorText = clientsTyping
    ? `${clientsTyping} ${typingClientIds.length === 1 ? 'is' : 'are'} typing`
    : '';

  return (
    <div id="typing-indicator" className="container">
      <div className="inner">
        <input
          type="text"
          id="user-input"
          className="uk-input uk-width-1-1 uk-border-rounded-left"
          placeholder="Start typing..."
          onKeyDown={start}
        />
        <label id="user-input-label" htmlFor="user-input">
          {typingIndicatorText}
        </label>
      </div>
    </div>
  );
};

function ChatApp() {
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

export default function App() {
  const [roomName, setRoomName] = useState('chat-typing-indicator');

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
        <ChatRoomProvider
          id={roomName}
          options={{
            ...AllFeaturesEnabled,
            typing: typingOptions,
          }}
        >
          <ChatApp />
        </ChatRoomProvider>
      </ChatClientProvider>
    </div>
  );
}
