'use client'

import { useState } from 'react';
import { Realtime } from 'ably';
import { AblyProvider } from 'ably/react';
import { nanoid } from 'nanoid';

export default function Home() {
  const [client, setClient] = useState<Realtime | null>(null);
  const [connectionState, setConnectionState] = useState('Disconnected');

  const connect = () => {
    const newClient = new Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_KEY,
      clientId: nanoid()
    });

    newClient.connection.on((stateChange) => {
      setConnectionState(stateChange.current);
      console.log(`Connection state changed to: ${stateChange.current}`);
    });

    setClient(newClient);
  };

  const disconnect = () => {
    if (client) {
      client.close();
      setClient(null);
      setConnectionState('Disconnected');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-1/2 h-1/2 flex flex-col items-center space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">
          Connection State: {connectionState}
        </h2>
        <div className="flex justify-center space-x-2">
          {connectionState === 'connected' ? (
            <button
              id="disconnect"
              onClick={disconnect}
              className="
                bg-red-500
                hover:bg-red-600
                text-white
                font-bold
                py-2
                px-4
                rounded
              "
            >
              Disconnect
            </button>
          ) : (
            <button
              id="connect"
              onClick={connect}
              className="
                bg-blue-500
                hover:bg-blue-600
                text-white
                font-bold
                py-2
                px-4
                rounded
              "
            >
              Connect
            </button>
          )}
        </div>
      </div>

      {client && (
        <AblyProvider client={client}>
          {/* Additional components can be added here */}
        </AblyProvider>
      )}
    </div>
  );
}
