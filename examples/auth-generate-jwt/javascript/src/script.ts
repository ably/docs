import * as Ably from 'ably';
import './styles.css';

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
      authUrl: 'http://localhost:3001/generate-jwt',
    });

    const messageTwo = document.getElementById('message-2');
    messageTwo.className = 'text-green-500';
    messageTwo.textContent = '✓';

    const button = document.getElementById('connect') as HTMLButtonElement;
    button.disabled = true;
    button.className = 'px-4 py-2 text-white rounded bg-gray-500';

    realtimeClient.connection.on('connected', () => {
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
