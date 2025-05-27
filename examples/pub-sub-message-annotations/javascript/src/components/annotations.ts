// Display of raw annotation messages

import type { Annotation } from 'ably';
import { findAnnotationType } from '../config';
import { createClientBadge } from './badge';

function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

function getAnnotationTypeKey(fullType: string): string {
  const parts = fullType.split(':');
  if (parts.length > 1) {
    return parts[1];
  }
  return fullType;
}

function createAnnotationItem(annotation: Annotation) {
  const typeKey = getAnnotationTypeKey(annotation.type);
  const { color, label } = findAnnotationType(typeKey);

  const item = document.createElement('div');
  item.className = `mb-2 p-3 border border-${color}-200 rounded-md bg-white shadow-sm`;
  item.setAttribute('data-id', annotation.id);
  item.setAttribute('data-timestamp', annotation.timestamp.toString());

  const header = document.createElement('div');
  header.className = 'flex justify-between items-center mb-2';

  const typeLabel = document.createElement('div');
  typeLabel.className = `text-sm font-medium text-${color}-800`;
  typeLabel.textContent = label;

  const timestamp = document.createElement('div');
  timestamp.className = 'text-xs text-gray-500';
  timestamp.textContent = formatTimestamp(annotation.timestamp);

  header.appendChild(typeLabel);
  header.appendChild(timestamp);
  item.appendChild(header);

  const value = document.createElement('div');
  value.className = 'mb-2';

  const valueLabel = document.createElement('span');
  valueLabel.className = 'text-xs text-gray-500 mr-1';
  valueLabel.textContent = 'Value:';

  const valueContent = document.createElement('span');
  valueContent.className = 'text-sm font-medium';
  valueContent.textContent = annotation.name || 'unknown';

  value.appendChild(valueLabel);
  value.appendChild(valueContent);
  item.appendChild(value);

  const clientInfo = document.createElement('div');
  clientInfo.className = 'flex items-center mt-2';

  const clientLabel = document.createElement('span');
  clientLabel.className = 'text-xs text-gray-500 mr-2';
  clientLabel.textContent = 'From:';

  clientInfo.appendChild(clientLabel);
  clientInfo.appendChild(createClientBadge(annotation.clientId || 'unknown', color));

  item.appendChild(clientInfo);

  return item;
}

export function createAnnotationsListElement(messageSerial: string) {
  const container = document.createElement('div');
  container.className = 'bg-white shadow-sm rounded-lg p-4 mb-4';
  container.id = `annotations-container-${messageSerial}`;

  const annotationsList = document.createElement('div');
  annotationsList.className = 'space-y-2 max-h-80 overflow-y-auto';
  annotationsList.id = `annotations-list-${messageSerial}`;
  annotationsList.setAttribute('data-message-serial', messageSerial);

  const emptyState = document.createElement('div');
  emptyState.className = 'text-center p-4 text-gray-500 text-sm';
  emptyState.textContent = 'No annotations received yet.';
  emptyState.id = `annotations-empty-${messageSerial}`;

  annotationsList.appendChild(emptyState);
  container.appendChild(annotationsList);

  return container;
}

export function addAnnotation(annotation: Annotation) {
  const messageSerial = annotation.messageSerial;
  const listContainer = document.getElementById(`annotations-list-${messageSerial}`);

  if (!listContainer) {
    return;
  }

  const existingAnnotation = document.querySelector(`[data-id="${annotation.id}"]`);
  if (existingAnnotation) {
    return;
  }

  const emptyState = document.getElementById(`annotations-empty-${messageSerial}`);
  if (emptyState) {
    emptyState.remove();
  }

  const annotationItem = createAnnotationItem(annotation);

  let inserted = false;
  const existingItems = listContainer.querySelectorAll('[data-timestamp]');

  for (const item of existingItems) {
    const itemTimestamp = parseInt(item.getAttribute('data-timestamp') || '0');
    if (annotation.timestamp > itemTimestamp) {
      listContainer.insertBefore(annotationItem, item);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    listContainer.appendChild(annotationItem);
  }
}
