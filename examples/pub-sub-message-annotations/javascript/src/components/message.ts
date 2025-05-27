// Components for displaying messages received on the channel

import { MessageCreate } from '../types';
import { createDropdownArrow, toggleArrowRotation } from './arrow';
import { createDetailsPane } from './details';

export function createMessageElement(message: MessageCreate) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'mb-4';
  messageContainer.setAttribute('data-serial', message.serial);

  const messageElement = document.createElement('div');
  messageElement.className = `flex justify-between items-center p-4 border rounded-lg bg-white shadow-md cursor-pointer`;
  messageElement.id = `message-${message.id}`;

  const textContent = document.createElement('span');
  textContent.textContent = message.data;
  messageElement.appendChild(textContent);

  const arrow = createDropdownArrow('gray');
  messageElement.appendChild(arrow);

  const detailsPane = createDetailsPane(message);
  detailsPane.classList.add('hidden');

  messageElement.addEventListener('click', () => {
    detailsPane.classList.toggle('hidden');
    toggleArrowRotation(arrow);
  });

  messageContainer.appendChild(messageElement);
  messageContainer.appendChild(detailsPane);

  return messageContainer;
}
