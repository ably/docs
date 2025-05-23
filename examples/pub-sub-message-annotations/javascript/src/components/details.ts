// Expandable details panel for messages that supports publishing
// annotations and viewing annotation summaries.

import { MessageCreate } from '../types';
import { annotationNamespace } from '../config';
import { publishAnnotation } from '../ably';
import { createAnnotationSummaryElement } from './summary';

export function createPublishAnnotationElement(message: MessageCreate) {
  const publisher = document.createElement('div');
  publisher.className = 'md:col-span-2 mb-4';
  publisher.innerHTML = `
    <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      <div class="flex-none">
        <div class="uk-form-controls">
          <select class="uk-select">
            <option>total.v1</option>
            <option>distinct.v1</option>
            <option>unique.v1</option>
            <option>multiple.v1</option>
            <option>flag.v1</option>
          </select>
        </div>
      </div>
      <input placeholder="Annotate message" class="uk-input uk-border-rounded-left h-10 border rounded-md px-3 bg-white" type="text" value="">
      <button class="uk-btn uk-btn-sm uk-btn-primary mb-1 rounded-md hover:uk-btn-primary+1 active:uk-btn-primary+2 h-10">Publish</button>
    </div>
  `;

  const publishButton = publisher.querySelector('button');
  publishButton?.addEventListener('click', () => {
    const selectInput = publisher.querySelector('select') as HTMLSelectElement;
    const annotationType = selectInput.options[selectInput.selectedIndex].value;
    const nameInput = publisher.querySelector('input') as HTMLInputElement;
    const name = nameInput.value.trim();
    if (name) {
      publishAnnotation(message, {
        type: `${annotationNamespace}:${annotationType}`,
        name,
      });
      nameInput.value = '';
    }
  });

  return publisher;
}

export function createMessageDetailsElement(message: MessageCreate) {
  const messageDetails = document.createElement('div');
  messageDetails.className = `grid grid-cols-1 gap-4`;
  const publishAnnotation = createPublishAnnotationElement(message);
  const annotationSummary = createAnnotationSummaryElement(message);
  messageDetails.appendChild(publishAnnotation);
  messageDetails.appendChild(annotationSummary);
  return messageDetails;
}

export function createDetailsPane(message: MessageCreate) {
  const detailsPane = document.createElement('div');
  detailsPane.className = 'mt-2 p-4 border rounded-lg bg-gray-50';
  detailsPane.id = `details-${message.id}`;

  const messageDetails = createMessageDetailsElement(message);
  detailsPane.appendChild(messageDetails);

  return detailsPane;
}
