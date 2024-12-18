'use client';

import * as Ably from 'ably';
import { AblyProvider, useConnectionStateListener } from 'ably/react';
import { useState, useEffect } from 'react';

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
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === 3 ? { ...msg, success: true } : msg
        )
      );
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
                {msg.success ?
                  <span className="text-green-500">✓</span> :
                  <span className="text-red-500">✗</span>
                }
              </span>
              {msg.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Authenticated() {
  const [messages, setMessages] = useState<StatusMessage[]>([
    { id: 1, success: false, message: "Client requests token from server" },
    { id: 2, success: false, message: "Client initializes connection to Ably with generated Token" },
    { id: 3, success: false, message: "Client is connected"}
  ]);
  const [client, setClient] = useState<Ably.Realtime | null>(null);

  useEffect(() => {
    try {
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === 1 ? { ...msg, success: true } : msg
        )
      );

      const newClient = new Ably.Realtime({ authUrl: 'http://localhost:3001/request-token' });
      setClient(newClient);
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === 2 ? { ...msg, success: true } : msg
        )
      );
    } catch (error) {
      console.error('Failed to initialise client:', error);
    }
  }, []);

  if (!client) return null;

  return (
    <AblyProvider client={client}>
      <StatusMessages messages={messages} setMessages={setMessages} />
    </AblyProvider>
  );
}
