import * as Ably from 'ably';
import { nanoid } from 'nanoid';

let client: Ably.Realtime | null = null;

const connect = () => {
  const newClient = new Ably.Realtime({
    key: import.meta.env.VITE_ABLY_KEY as string,
    clientId: nanoid(),
  });

  newClient.connection.on((stateChange) => {
    document.getElementById('status').textContent = `Connection State: ${stateChange.current}`;
    const button = document.getElementById('button-status');
    button.textContent = stateChange.current === 'connected' ? 'Disconnect' : 'Connect';

    console.log(`Connection state changed to: ${stateChange.current}`);
  });

  client = newClient;
};

const disconnect = () => {
  if (client) {
    client.close();
    client = null;
  }
};

document.getElementById('button-status').addEventListener('click', () => {
  const buttonText = document.getElementById('button-status').textContent;
  console.log('Button text content:', buttonText);
  if (buttonText === 'Connect') {
    connect();
  } else {
    disconnect();
  }
});
