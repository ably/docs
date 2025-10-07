// Components for displaying messages received on the channel
import type { MessageWithSerial } from '../types';
import { createDropdownArrow, toggleArrowRotation } from './arrow';
import { createDetailsPane } from './details';
import { createBadge } from './badge';

// Format timestamp for human-readable display
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function createMessageElement(message: MessageWithSerial) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'mb-4';
  messageContainer.setAttribute('data-serial', message.serial);

  // Main message element that can be clicked to expand
  const messageElement = document.createElement('div');
  messageElement.className = `px-3 py-2 border-t border-l border-r border-gray-200 rounded-t-md bg-white shadow-sm cursor-pointer`;
  messageElement.id = `message-${message.id}`;

  // First row: message text (left aligned) and dropdown arrow (right aligned)
  const firstRow = document.createElement('div');
  firstRow.className = 'flex justify-between items-center w-full';

  const messageContent = document.createElement('div');
  messageContent.className = 'flex-grow text-sm font-medium text-gray-700 overflow-hidden text-ellipsis';
  messageContent.textContent = message.data;
  firstRow.appendChild(messageContent);

  // Add dropdown arrow
  const arrow = createDropdownArrow('gray');
  arrow.classList.add('ml-2', 'shrink-0');
  firstRow.appendChild(arrow);

  messageElement.appendChild(firstRow);

  // Second row: client ID and timestamp (both right aligned)
  const secondRow = document.createElement('div');
  secondRow.className = 'flex justify-end items-center w-full mt-1 gap-2';

  const clientBadge = createBadge(message.clientId || 'unknown', 'gray');
  clientBadge.classList.add('shrink-0');

  const timestamp = document.createElement('div');
  timestamp.className = 'text-xs text-gray-500';
  timestamp.textContent = formatTimestamp(message.timestamp || Date.now());

  secondRow.appendChild(clientBadge);
  secondRow.appendChild(timestamp);

  messageElement.appendChild(secondRow);

  // Create the expandable details pane
  const detailsPane = createDetailsPane(message);
  detailsPane.classList.add('hidden');

  // Add click handler to toggle details
  messageElement.addEventListener('click', (e) => {
    e.preventDefault();
    detailsPane.classList.toggle('hidden');
    toggleArrowRotation(arrow);
  });

  // Add all elements to the container
  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(detailsPane);

  return messageContainer;
}
