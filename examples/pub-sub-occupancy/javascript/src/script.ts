import * as Ably from 'ably';
import type { Message } from 'ably';
import { nanoid } from 'nanoid';
import './styles.css';

const occupantCount = document.getElementById('occupants-count');

const client = new Ably.Realtime({
  key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
  clientId: nanoid(),
});

const channel = client.channels.get('occupancy-example', { params: { occupancy: 'metrics' } });

channel.subscribe((message: Message) => {
  console.log('occupancy: ', message.data);
  occupantCount.textContent = message.data.metrics.connections;
});

async function simulatedOccupants() {
  console.log('Simulating 20 clients attaching and detaching from the channel');

  for (let loopCount = 0; loopCount < 20; loopCount++) {
    const clientId = nanoid();
    const client = new Ably.Realtime({
      key: import.meta.env.VITE_PUBLIC_ABLY_KEY as string,
      clientId,
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

if (typeof window !== 'undefined') {
  simulatedOccupants();
}
