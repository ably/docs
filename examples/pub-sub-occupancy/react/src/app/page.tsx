'use client'

import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';

export default function Home() {
  const clientId = nanoid();
  const client = new Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_KEY,
    clientId
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="occupancy-example" options={{ params: { occupancy: 'metrics' } }}>
        <Stream />
      </ChannelProvider>
    </AblyProvider>
  );
}

function Stream() {
  const [occupancySubscribers, setOccupancySubscribers] = useState(0);
  useChannel('occupancy-example', (message) => {
    console.log('occupancy: ', message.data);
    setOccupancySubscribers(message.data.metrics.connections);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      simulatedOccupants();
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen p-4 relative">
      <div className="w-full max-w-2xl h-[400px] bg-gray-200 flex items-center justify-center relative">
        <video
          src="https://cdn.ably.com/chat/basket_ball_international.mov"
          preload="auto"
          autoPlay
          muted
          loop
          className="w-full h-full"
        />

        <div className="absolute bottom-4 right-4 flex items-center bg-black/50 text-white px-3 py-2 rounded-full">
          <FaEye className="mr-2" />
          <span>{occupancySubscribers}</span>
        </div>
      </div>
    </div>
  );
}

// Simulating 20 clients connecting and disconnecting.
async function simulatedOccupants() {
  console.log('Simulating 20 clients attaching and detaching from the channel');
  for (let loopCount = 0; loopCount < 20; loopCount++) {
    const clientId = nanoid();
    const client = new Realtime({
      key: process.env.NEXT_PUBLIC_ABLY_KEY,
      clientId
    });

    const channel = client.channels.get('occupancy-example');
    // Attach would be called automatically when subscribing to a channel,
    // but for the simulation we do not need to subscribe. We just need to attach.
    const randomDuration = 5000 + Math.random() * 10000;
    console.log(`Client ${clientId} is connecting for ${randomDuration}ms`);
    await channel.attach();

    setTimeout(() => {
      console.log(`Client ${clientId} is disconnecting`);
      client.close();
    }, randomDuration);

    loopCount++;
  }
}
