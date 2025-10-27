import React, { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { AblyProvider, useConnectionStateListener } from 'ably/react';
import './styles/styles.css';
import { config } from './config';

interface StatusMessage {
  id: number;
  success: boolean;
  message: string;
}

interface StatusMessagesProps {
  messages: StatusMessage[];
  setMessages: React.Dispatch<React.SetStateAction<StatusMessage[]>>;
}

const StatusMessages = ({ messages, setMessages }: StatusMessagesProps) => {
  useConnectionStateListener((stateChange) => {
    if (stateChange.current === 'connected') {
      setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === 3 ? { ...msg, success: true } : msg)));
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-[50%] flex flex-col">
        <div className="flex-grow text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication with Ably</h1>
          <p className="mb-8">The Ably client has been successfully initialized.</p>
        </div>

        <div className="mt-4 text-left text-sm h-40 overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-center gap-2">
              <span>
                {msg.success ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
              </span>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [client, setClient] = useState<Ably.Realtime | null>(null);
  const [messages, setMessages] = useState<StatusMessage[]>([
    { id: 1, success: false, message: 'Client requests token from server' },
    { id: 2, success: false, message: 'Client initializes connection to Ably with generated Token' },
    { id: 3, success: false, message: 'Client is connected' },
  ]);

  const handleConnect = async () => {
    // Update first message
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === 1 ? { ...msg, success: true } : msg)));

    // Initialize Ably client with token auth
    const realtimeClient = new Ably.Realtime({
      authUrl: config.AUTH_URL || 'http://localhost:3001/request-token',
    });

    // Update second message
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === 2 ? { ...msg, success: true } : msg)));

    setClient(realtimeClient);
  };

  if (client) {
    return (
      <AblyProvider client={client}>
        <StatusMessages messages={messages} setMessages={setMessages} />
      </AblyProvider>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-[50%] flex flex-col">
        <div className="flex-grow text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication with Ably</h1>
          <p>Press the Connect button to initialize the client:</p>
          <button onClick={handleConnect} className="uk-btn uk-btn-md uk-btn-primary mb-4 rounded">
            Connect
          </button>
        </div>

        <div className="mt-4 text-left text-sm h-40 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={msg.id} className="flex items-center gap-2">
              <span>
                {msg.success ? <span className="text-green-500">✓</span> : <span className="text-red-500">✗</span>}
              </span>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
