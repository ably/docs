'use client';

import * as Ably from 'ably';
import { useState } from 'react';

// Main Home component
export default function Home() {
  const [client, setClient] = useState<Ably.Realtime | null>(null);
  const [messages, setMessages] = useState<string[]>([]); // Array to store the numbered messages
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setMessages([]);
    setIsLoading(true);

    setMessages((prevMessages) => [...prevMessages, "1. Client requests token from server"]);

    try {
      const ablyClient = new Ably.Realtime({ authUrl: 'http://localhost:3001/auth-url' });
      setClient(ablyClient);

      setMessages((prevMessages) => [
        ...prevMessages,
        "2. Client initializes connection to Ably with generated Token",
      ]);

    } catch (error) {
      console.error('Failed to initialise client:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        "3. Failed to initialise client. Please try again."
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-[50%] flex flex-col">
        <div className="flex-grow text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Ably Token Manager</h1>
          <p className="mb-8">Press the Connect button to initialize the client:</p>
          <button
            onClick={handleConnect}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </div>

        <div className="mt-4 text-left text-sm h-40 overflow-y-auto">
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="border-b py-1">
                {msg}
              </li>
            ))}
          </ul>
        </div>

        {client ? (
          <div className="mt-4 flex flex-col items-center justify-center h-16">
            <h2 className="text-lg font-bold">Client Initialized</h2>
            <p>The Ably client has been successfully initialized.</p>
          </div>
        ) : (
          <div className="mt-4 h-16 flex items-center justify-center"></div>
        )}
      </div>
    </div>
  );
}
