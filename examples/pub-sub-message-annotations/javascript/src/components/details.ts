// Details panel with publishing controls and tabbed annotations view
import type { MessageWithSerial } from '../types';
import { publishAnnotation } from '../ably';
import { createAnnotationSummaryElement } from './summary';
import { createAnnotationsListElement } from './annotations';

export function createPublishAnnotationElement(message: MessageWithSerial) {
  const publisher = document.createElement('div');
  publisher.className = 'p-2 border-b border-gray-200 bg-gray-50';
  publisher.innerHTML = `
    <div class="flex items-center gap-1.5">
      <select class="uk-select uk-form-sm w-24 flex-none bg-white border rounded-md">
        <option>total.v1</option>
        <option>distinct.v1</option>
        <option>unique.v1</option>
        <option>multiple.v1</option>
        <option>flag.v1</option>
      </select>
      <input placeholder="Annotate message" class="uk-input uk-form-sm border rounded-md bg-white flex-grow" type="text">
      <button class="uk-btn uk-btn-primary uk-btn-sm rounded-md flex-none">Publish</button>
    </div>
  `;

  const publishButton = publisher.querySelector('button');
  publishButton?.addEventListener('click', (e) => {
    e.preventDefault();
    const selectInput = publisher.querySelector('select') as HTMLSelectElement;
    const annotationType = selectInput.options[selectInput.selectedIndex].value;
    const nameInput = publisher.querySelector('input') as HTMLInputElement;
    const name = nameInput.value.trim();

    if (name) {
      // You might have multiple different usecases for annotations on the same message
      // with the same aggregation type. A namespace lets you keep them separate, e.g.
      // `read-receipt:flag.v1` and `delivery-receipt:flag.v1`. Here we just use "example"
      // for everything since this example app only wants to use each aggregation type once.
      publishAnnotation(message, {
        type: `example:${annotationType}`,
        name,
        count: 1, // only used by the multiple.v1 aggregation type, but for simplicity just set it to 1 unconditionally
      });
      nameInput.value = '';
    }
  });

  return publisher;
}

export function createMessageDetailsElement(message: MessageWithSerial) {
  const messageDetails = document.createElement('div');
  messageDetails.className = 'grid grid-cols-1';

  const publishAnnotation = createPublishAnnotationElement(message);
  messageDetails.appendChild(publishAnnotation);

  const tabContainer = document.createElement('div');
  tabContainer.className = 'overflow-hidden';

  const tabList = document.createElement('ul');
  tabList.className = 'uk-tab';
  tabList.setAttribute('data-uk-tab', '');

  const summaryTabItem = document.createElement('li');
  summaryTabItem.className = 'uk-active';
  const summaryLink = document.createElement('a');
  summaryLink.href = '#';
  summaryLink.textContent = 'Summary';
  summaryTabItem.appendChild(summaryLink);

  const rawTabItem = document.createElement('li');
  const rawLink = document.createElement('a');
  rawLink.href = '#';
  rawLink.textContent = 'Raw Annotations';
  rawTabItem.appendChild(rawLink);

  tabList.appendChild(summaryTabItem);
  tabList.appendChild(rawTabItem);

  const tabContent = document.createElement('div');
  tabContent.className = 'uk-switcher';

  const summaryPanel = document.createElement('div');
  summaryPanel.className = 'uk-active p-4';
  summaryPanel.appendChild(createAnnotationSummaryElement(message));

  const rawPanel = document.createElement('div');
  rawPanel.className = 'p-4';
  rawPanel.appendChild(createAnnotationsListElement(message.serial));

  tabContent.appendChild(summaryPanel);
  tabContent.appendChild(rawPanel);

  tabContainer.appendChild(tabList);
  tabContainer.appendChild(tabContent);

  summaryLink.addEventListener('click', (e) => {
    e.preventDefault();
    summaryTabItem.className = 'uk-active';
    rawTabItem.className = '';
    summaryPanel.className = 'uk-active p-4';
    rawPanel.className = 'p-4';
  });

  rawLink.addEventListener('click', (e) => {
    e.preventDefault();
    rawTabItem.className = 'uk-active';
    summaryTabItem.className = '';
    rawPanel.className = 'uk-active p-4';
    summaryPanel.className = 'p-4';
  });

  messageDetails.appendChild(tabContainer);

  return messageDetails;
}

export function createDetailsPane(message: MessageWithSerial) {
  const detailsPane = document.createElement('div');
  detailsPane.className = 'border-b border-l border-r border-gray-200 rounded-b-md overflow-hidden bg-white shadow-sm';
  detailsPane.id = `details-${message.id}`;

  const messageDetails = createMessageDetailsElement(message);
  detailsPane.appendChild(messageDetails);

  return detailsPane;
}
