import { ChatClient } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider } from '@ably/chat/react';
import { Realtime } from 'ably';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useEffect, useState } from 'react';
import { config } from './config';
import './styles/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';

const realtimeClient = new Realtime({ key: config.ABLY_KEY, clientId: minifaker.firstName() });
const chatClient = new ChatClient(realtimeClient);

export default function App() {
  const [roomName, setRoomName] = useState('chat-room-history');

  useEffect(() => {
    const name = config.ROOM_NAME;

    if (name !== null) {
      setRoomName(name);
    }
  }, []);

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider name={roomName}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </BrowserRouter>
      </ChatRoomProvider>
    </ChatClientProvider>
  );
}
