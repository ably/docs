'use client'

import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';

export default function Home() {
  const clientId = nanoid();
  const client = new Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_KEY,
    clientId
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="[meta]occupancy" options={{ params: { occupancy: 'metrics' } }}>
        <Stream />
      </ChannelProvider>
    </AblyProvider>
  );
}

function Stream() {
  const [occupancySubscribers, setOccupancySubscribers] = useState(0);
  const { channel } = useChannel('[meta]occupancy', (message) => {
    console.log('occupancy: ', message.data);
    setOccupancySubscribers(message.data.metrics.subscribers);
  });

  return (
    <div className="flex justify-center items-center min-h-screen p-4 relative">
      {/* Video Stream Placeholder */}
      <div className="w-full max-w-4xl h-[600px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Live Video Stream Placeholder</p>
      </div>

      {/* Occupancy Indicator */}
      <div className="absolute bottom-4 right-4 flex items-center bg-black/50 text-white px-3 py-2 rounded-full">
        <FaEye className="mr-2" />
        <span>{occupancySubscribers}</span>
      </div>
    </div>
  );
}
