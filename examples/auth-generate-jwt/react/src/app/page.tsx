'use client';

import * as Ably from 'ably';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface StatusMessage {
  id: number;
  success: boolean;
  message: string;
}

export default function Home() {
  const [client, setClient] = useState<Ably.Realtime | null>(null);
  const [messages, setMessages] = useState<StatusMessage[]>([
    { id: 1, success: false, message: "Client requests JWT from server" },
    { id: 2, success: false, message: "Client initializes connection to Ably with generated JWT" },
    { id: 3, success: false, message: "Client is connected"}
  ]);
  const router = useRouter();
  const handleConnect = async () => {
    router.push('/authenticated');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-[50%] flex flex-col">
        <div className="flex-grow text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication to Ably with a JWT</h1>
          <p>Press the Connect button to initialize the client:</p>
          <button
            onClick={handleConnect}
            className='px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600'
          >
            Connect
          </button>
        </div>

        <div className="mt-4 text-left text-sm h-40 overflow-y-auto">
          {messages.map((msg, index) => (
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
}
