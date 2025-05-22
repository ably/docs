import * as Ably from 'ably';
import { nanoid } from 'nanoid';
import './styles.css';

const client = new Ably.Realtime({
  clientId: nanoid(),
  key: import.meta.env.VITE_ABLY_KEY as string,
});

const urlParams = new URLSearchParams(window.location.search);

const channelName = urlParams.get('name') || 'pub-sub-message-annotations';
const channel = client.channels.get(channelName);

const clientId = urlParams.get('clientId') || 'user2';
console.log(`Client ID: ${clientId}`);

channel.subscribe((message) => {
  console.log(message);
});
