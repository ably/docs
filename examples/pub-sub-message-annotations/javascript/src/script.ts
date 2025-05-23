import * as Ably from 'ably';
import type { RealtimeChannel, Message } from 'ably';
import './styles.css';

const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get('clientId') || 'user2';
const channelName = urlParams.get('name') || 'pub-sub-message-annotations';

const client = new Ably.Realtime({
  clientId,
  key: import.meta.env.VITE_ABLY_KEY as string,
});

const channel = client.channels.get(channelName);

let selectedMessageId: string | undefined;

function createMessageDetailsElement(message: Message) {
  const messageDetails = document.createElement('div');
  messageDetails.className = `grid grid-cols-2 gap-4`;
  messageDetails.innerHTML = `
    <div>
      <h3 class="font-semibold text-sm mb-2">Message Info</h3>
      <p class="text-xs mb-1"><span class="font-medium">ID:</span> ${message.id}</p>
      <p class="text-xs mb-1"><span class="font-medium">Client ID:</span> ${message.clientId}</p>
      <p class="text-xs mb-1"><span class="font-medium">Action:</span> ${message.action}</p>
    </div>
  `;
  return messageDetails;
}

function createDetailsPane(message: Message) {
  // Create the details pane (initially hidden)
  const detailsPane = document.createElement('div');
  detailsPane.className = 'mt-2 p-4 border rounded-lg bg-gray-50 hidden';
  detailsPane.id = `details-${message.id}`;

  const messageDetails = createMessageDetailsElement(message);
  detailsPane.appendChild(messageDetails);

  return detailsPane;
}

function createMessageElement(message: Message) {
  // Create the container for the message
  const messageContainer = document.createElement('div');
  messageContainer.className = 'mb-4';

  // Create the message element
  const messageElement = document.createElement('div');
  messageElement.className = `p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200`;
  messageElement.id = `message-${message.id}`;
  messageElement.textContent = message.data;

  // Create the details pane
  const detailsPane = createDetailsPane(message);

  // Add event listener to toggle details pane
  messageElement.addEventListener('click', () => {
    // If this message is already selected, hide details and deselect
    if (selectedMessageId === message.id) {
      detailsPane.classList.add('hidden');
      selectedMessageId = undefined;
      messageElement.classList.remove('border-primary');
      return;
    }

    // Hide any currently visible details pane
    if (selectedMessageId) {
      const currentDetailsPane = document.getElementById(`details-${selectedMessageId}`);
      if (currentDetailsPane) {
        currentDetailsPane.classList.add('hidden');
      }

      // Remove highlight from previously selected message
      const prevSelected = document.getElementById(`message-${selectedMessageId}`);
      if (prevSelected) {
        prevSelected.classList.remove('border-primary');
      }
    }

    // Show this message's details and set as selected
    detailsPane.classList.remove('hidden');
    selectedMessageId = message.id;
    messageElement.classList.add('border-primary');
  });

  // Add elements to the container
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(detailsPane);

  return messageContainer;
}

async function subscribeToChannel(channel: RealtimeChannel) {
  channel.subscribe((message: Message) => {
    const messageElement = createMessageElement(message);
    document.getElementById('messages')?.appendChild(messageElement);
  });
}

const publishButton = document.getElementById('publish-button');

publishButton?.addEventListener('click', () => {
  const messageInput = document.getElementById('message-input') as HTMLInputElement;
  const message = messageInput.value.trim();

  if (message) {
    channel.publish('message', message);
    messageInput.value = '';
  }
});

async function main() {
  await subscribeToChannel(channel);
}

main();
