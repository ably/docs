'use client'

import { useEffect, useState } from 'react';
import { Realtime } from 'ably';
import { AblyProvider, useConnectionStateListener } from 'ably/react';
import { nanoid } from 'nanoid';

export default function Home() {
  const [client, setClient] = useState<Realtime | null>(null);
  const [connectionState, setConnectionState] = useState('closed');

  useEffect(() => {
    if (connectionState === 'closed') {
      setClient(null);
    }
  }, [connectionState]);

  const connect = () => {
    const newClient = new Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_KEY,
      clientId: nanoid()
    });

    setClient(newClient);
  };

  const disconnect = () => {
    if (client) {
      client.close();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-1/2 h-1/2 flex flex-col items-center space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">
          Connection State: {connectionState}
        </h2>
        <div className="flex justify-center space-x-2">
          {client ? (
            <AblyProvider client={client}>
              <ConnectionStateComponent
                onDisconnect={disconnect}
                setConnectionState={setConnectionState}
              />
            </AblyProvider>
          ) : (
            <button
              id="connect"
              onClick={connect}
              className="uk-btn uk-btn-md uk-btn-primary mb-4 rounded min-w-[180px]"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ConnectionStateComponent({
  onDisconnect,
  setConnectionState
}: {
  onDisconnect: () => void,
  setConnectionState: (state: string) => void
}) {
  useConnectionStateListener((stateChange) => {
    setConnectionState(stateChange.current);
    console.log(`Connection state changed to: ${stateChange.current}`);
  });

  return (
    <button
      id="disconnect"
      onClick={onDisconnect}
      className="uk-btn uk-btn-md uk-btn-primary mb-4 rounded min-w-[180px]"
    >
      Disconnect
    </button>
  );
}
