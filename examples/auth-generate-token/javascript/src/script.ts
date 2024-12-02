import * as Ably from 'ably';
import './styles.css';

const connectButton = document.querySelector('button') as HTMLButtonElement;

connectButton.addEventListener('click', () => {
  handleConnect();
});

function handleConnect() {
  // Add your connection logic here
  console.log('Connect button clicked');

  const messagesUl = document.getElementById('messages');
  const newMessage = document.createElement('li');
  newMessage.className = 'border-b py-1';
  newMessage.textContent = '1. Client requests token from server';
  messagesUl.appendChild(newMessage);

  try {
    const realtimeClient = new Ably.Realtime({
      authUrl: 'http://localhost:3001/auth-url',
    });

    const clientInializedMessage = document.createElement('li');
    clientInializedMessage.className = 'border-b py-1';
    clientInializedMessage.textContent = '2. Client initializes connection to Ably with generated Token';
    messagesUl.appendChild(clientInializedMessage);

    const headerInitialized = document.getElementById('header-initialized');
    const paragraphInitialized = document.getElementById('paragraph-initialized');

    headerInitialized.style.display = 'block';
    paragraphInitialized.style.display = 'block';
  } catch (error) {
    const clientFailedMessage = document.createElement('li');
    clientFailedMessage.className = 'border-b py-1';
    clientFailedMessage.textContent = '3. Failed to initialise client. Please try again.';
    messagesUl.appendChild(clientFailedMessage);
  }
}
