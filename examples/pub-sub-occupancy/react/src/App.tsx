import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider, useChannel } from 'ably/react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { config } from './config';
import './styles/styles.css';

const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
const channelName = urlParams.get('name') || 'pub-sub-occupancy';

function Stream() {
  const [occupancySubscribers, setOccupancySubscribers] = useState(0);
  useChannel(channelName, (message) => {
    console.log('occupancy: ', message.data);
    setOccupancySubscribers(message.data.metrics.connections);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      simulatedOccupants();
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen relative uk-text-primary">
      <div className="h-[320px] bg-gray-200 flex items-center justify-center relative">
        <video
          src="https://cdn.ably.com/chat/basket_ball_international.mov"
          preload="auto"
          autoPlay
          muted
          loop
          className="max-w-full max-h-full object-contain"
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
      key: config.ABLY_KEY,
      clientId,
    });

    const channel = client.channels.get(channelName);
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

export default function App() {
  const clientId = nanoid();
  const client = new Realtime({
    key: config.ABLY_KEY,
    clientId,
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName} options={{ params: { occupancy: 'metrics' } }}>
        <Stream />
      </ChannelProvider>
    </AblyProvider>
  );
}
