import { ChatClient } from '@ably/chat';
import { ChatClientProvider, ChatRoomProvider } from '@ably/chat/react';
import { Realtime } from 'ably';
import minifaker from 'minifaker';
import 'minifaker/locales/en';
import { useEffect, useState } from 'react';
import './styles/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Chat from './Chat';

const realtimeClient = new Realtime({ key: import.meta.env.VITE_ABLY_KEY, clientId: minifaker.firstName() });
const chatClient = new ChatClient(realtimeClient);

export default function App() {
  const [roomName, setRoomName] = useState('chat-room-history');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    if (name !== null) {
      setRoomName(name);
    }
  }, []);

  return (
    <ChatClientProvider client={chatClient}>
      <ChatRoomProvider id={roomName}>
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
