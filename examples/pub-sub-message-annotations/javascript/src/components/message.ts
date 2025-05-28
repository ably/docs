// Components for displaying messages received on the channel

import { MessageCreate } from '../types';
import { createDropdownArrow, toggleArrowRotation } from './arrow';
import { createDetailsPane } from './details';
import { createBadge } from './badge';

// Format timestamp for human-readable display
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function createMessageElement(message: MessageCreate) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'mb-4';
  messageContainer.setAttribute('data-serial', message.serial);

  // Main message element that can be clicked to expand
  const messageElement = document.createElement('div');
  messageElement.className = `flex flex-col p-4 border rounded-lg bg-white shadow-md cursor-pointer`;
  messageElement.id = `message-${message.id}`;

  // Create header row with clientId and timestamp
  const headerRow = document.createElement('div');
  headerRow.className = 'flex justify-between items-center mb-2';
  
  // Client info with "From:" label
  const clientContainer = document.createElement('div');
  clientContainer.className = 'flex items-center';
  
  const clientLabel = document.createElement('span');
  clientLabel.className = 'text-xs text-gray-500 mr-2';
  clientLabel.textContent = 'From:';
  
  clientContainer.appendChild(clientLabel);
  clientContainer.appendChild(createBadge(message.clientId || 'unknown', 'blue'));
  
  // Timestamp with label
  const timestampContainer = document.createElement('div');
  timestampContainer.className = 'flex items-center';
  
  const timestampLabel = document.createElement('span');
  timestampLabel.className = 'text-xs text-gray-500 mr-1';
  timestampLabel.textContent = 'Time:';
  
  const timestampValue = document.createElement('span');
  timestampValue.className = 'text-xs text-gray-600';
  timestampValue.textContent = formatTimestamp(message.timestamp);
  
  timestampContainer.appendChild(timestampLabel);
  timestampContainer.appendChild(timestampValue);
  
  headerRow.appendChild(clientContainer);
  headerRow.appendChild(timestampContainer);
  messageElement.appendChild(headerRow);

  // Create content row with message text and dropdown arrow
  const contentRow = document.createElement('div');
  contentRow.className = 'flex justify-between items-center';

  // Message content with "Message:" label
  const messageContentContainer = document.createElement('div');
  messageContentContainer.className = 'flex items-center';
  
  const messageLabel = document.createElement('span');
  messageLabel.className = 'text-xs text-gray-500 mr-2';
  messageLabel.textContent = 'Message:';
  
  const textContent = document.createElement('span');
  textContent.className = 'text-sm font-medium';
  textContent.textContent = message.data;
  
  messageContentContainer.appendChild(messageLabel);
  messageContentContainer.appendChild(textContent);
  
  contentRow.appendChild(messageContentContainer);
  
  // Add dropdown arrow
  const arrow = createDropdownArrow('gray');
  contentRow.appendChild(arrow);
  
  messageElement.appendChild(contentRow);

  // Create the expandable details pane
  const detailsPane = createDetailsPane(message);
  detailsPane.classList.add('hidden');

  // Add click handler to toggle details
  messageElement.addEventListener('click', () => {
    detailsPane.classList.toggle('hidden');
    toggleArrowRotation(arrow);
  });

  // Add all elements to the container
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(detailsPane);

  return messageContainer;
}
