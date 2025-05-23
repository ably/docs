import * as Ably from 'ably';
import type { RealtimeChannel, Message } from 'ably';
import './styles.css';

const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get('clientId') || 'user2';
const channelName = urlParams.get('name') || 'mutable:pub-sub-message-annotations';

const client = new Ably.Realtime({
  clientId,
  key: import.meta.env.VITE_ABLY_KEY as string,
});

const channel = client.channels.get(channelName, {
  modes: ['PUBLISH', 'SUBSCRIBE', 'ANNOTATION_PUBLISH', 'ANNOTATION_SUBSCRIBE'],
});
const annotationNamespace = 'my-annotations';

let selectedMessageId: string | undefined;

function createPublishAnnotationElement(message: Message) {
  const publishAnnotation = document.createElement('div');
  publishAnnotation.className = 'md:col-span-2 mb-4';
  publishAnnotation.innerHTML = `
    <h3 class="font-semibold text-sm mb-2">Annotations</h3>
    <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      <div class="flex-none">
        <div class="uk-form-controls">
          <select class="uk-select">
            <option>distinct.v1</option>
            <option>unique.v1</option>
            <option>multiple.v1</option>
            <option>flag.v1</option>
            <option>total.v1</option>
          </select>
        </div>
      </div>
      <input placeholder="Annotate message" class="uk-input uk-border-rounded-left h-10 border rounded-md px-3 bg-white" type="text" value="">
      <button class="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-md hover:uk-btn-primary+1 active:uk-btn-primary+2 h-10">Publish</button>
    </div>
  `;
  const publishButton = publishAnnotation.querySelector('button');
  publishButton?.addEventListener('click', () => {
    const selectInput = publishAnnotation.querySelector('select') as HTMLSelectElement;
    const annotationType = selectInput.options[selectInput.selectedIndex].value;
    const dataInput = publishAnnotation.querySelector('input') as HTMLInputElement;
    const data = dataInput.value.trim();
    if (data) {
      channel.annotations.publish(message, {
        type: `${annotationNamespace}:${annotationType}`,
        data: data,
      });
      dataInput.value = '';
    }
  });
  return publishAnnotation;
}

function createMessageDetailsElement(message: Message) {
  const messageDetails = document.createElement('div');
  messageDetails.className = `grid grid-cols-1 md:grid-cols-3 gap-4`;
  messageDetails.innerHTML = `
    <div class="md:col-span-1">
      <h3 class="font-semibold text-sm mb-2">Message Info</h3>
      <p class="text-xs mb-1"><span class="font-medium">ID:</span> ${message.id}</p>
      <p class="text-xs mb-1"><span class="font-medium">Serial:</span> ${message.serial}</p>
      <p class="text-xs mb-1"><span class="font-medium">Client ID:</span> ${message.clientId}</p>
      <p class="text-xs mb-1"><span class="font-medium">Action:</span> ${message.action}</p>
    </div>
  `;
  const publishAnnotation = createPublishAnnotationElement(message);
  messageDetails.appendChild(publishAnnotation);
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
  messageElement.className = `flex space-x-2 p-4 border rounded-lg bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200`;
  messageElement.id = `message-${message.id}`;
  let badgeColor = 'bg-gray-300 text-gray-800';
  let title = message.name;
  if (message.action === 'message.create') {
    badgeColor = 'bg-green-100 text-green-800';
    title = message.data;
  } else if (message.action === 'message.summary') {
    badgeColor = 'bg-blue-100 text-blue-800';
    title = message.serial;
  }
  messageElement.innerHTML = `
    <span class="text-xs font-semibold px-2 py-1 rounded ${badgeColor}">
      ${message.action}
    </span>
    <div class="text-sm font-medium">${title}</div>
  `;

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
