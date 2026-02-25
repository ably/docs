import * as Ably from 'ably';
import './styles.css';
import { config } from './config';

const connectButton = document.querySelector('button') as HTMLButtonElement;

connectButton.addEventListener('click', () => {
  handleConnect();
});

function handleConnect() {
  try {
    const messageOne = document.getElementById('message-1');
    messageOne.className = 'text-green-500';
    messageOne.textContent = '✓';

    const realtimeClient = new Ably.Realtime({
      authCallback: async (_tokenParams, callback) => {
        try {
          const response = await fetch(config.AUTH_URL || 'http://localhost:3001/request-token');
          if (!response.ok) {
            callback(`Auth server error: ${response.status}`, null);
            return;
          }
          const contentType = response.headers.get('content-type');
          const token = contentType?.includes('application/json')
            ? await response.json()
            : await response.text();
          callback(null, token);
        } catch (error) {
          callback(error instanceof Error ? error.message : String(error), null);
        }
      },
    });

    const messageTwo = document.getElementById('message-2');
    messageTwo.className = 'text-green-500';
    messageTwo.textContent = '✓';

    const button = document.getElementById('connect') as HTMLButtonElement;
    button.disabled = true;
    button.className = 'px-4 py-2 text-white rounded bg-gray-500';

    realtimeClient.connection.on('connected', (stateChange) => {
      const messageThree = document.getElementById('message-3');
      messageThree.className = 'text-green-500';
      messageThree.textContent = '✓';

      const headingMessage = document.getElementById('heading-message');
      headingMessage.textContent = 'The Ably client has been successfully initialized.';
    });
  } catch (error) {
    console.error('Failed to connect client:', error);
  }
}
