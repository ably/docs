// Display of raw annotation messages

import type { Annotation } from 'ably';
import { findAnnotationType } from '../config';
import { createBadge } from './badge';
import { deleteAnnotation } from '../ably';

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
  item.className = `mb-2 pl-3 pr-2 py-2 border-l-4 border-l-${color}-500 border-y border-r border-gray-200 rounded-r-md bg-white shadow-sm flex flex-wrap items-center`;
  item.setAttribute('data-id', annotation.id);
  item.setAttribute('data-timestamp', annotation.timestamp.toString());
  item.setAttribute('data-serial', annotation.messageSerial);
  item.setAttribute('data-action', annotation.action || '');

  // First row: type, value (left aligned) and delete button (right aligned)
  const firstRow = document.createElement('div');
  firstRow.className = 'flex justify-between items-center w-full';
  
  const leftContent = document.createElement('div');
  leftContent.className = 'flex items-center gap-2 min-w-0 flex-grow';
  
  const typeLabel = document.createElement('span');
  typeLabel.className = `text-sm font-medium text-${color}-800`;
  typeLabel.textContent = label;
  leftContent.appendChild(typeLabel);
  
  const valueContent = document.createElement('span');
  valueContent.className = 'text-sm text-gray-700 overflow-hidden text-ellipsis';
  valueContent.textContent = annotation.name || 'unknown';
  leftContent.appendChild(valueContent);

  firstRow.appendChild(leftContent);

  if (annotation.action !== 'annotation.delete') {
    const deleteIcon = document.createElement('div');
    deleteIcon.className = `size-4 text-red-500 hover:text-red-800 cursor-pointer shrink-0 ml-auto`;
    deleteIcon.innerHTML = `<uk-icon icon="trash-2"></uk-icon>`;
    deleteIcon.addEventListener('click', () => {
      deleteAnnotation(annotation.messageSerial, annotation);
    });
    firstRow.appendChild(deleteIcon);
  }

  item.appendChild(firstRow);

  // Second row: action (left aligned) and client ID with timestamp (right aligned)
  const secondRow = document.createElement('div');
  secondRow.className = 'flex justify-between items-center w-full mt-1';

  let action = 'CREATE';
  let actionColor = 'green';
  if (annotation.action === 'annotation.delete') {
    action = 'DELETE';
    actionColor = 'red';
  }
  const actionBadge = createBadge(action, actionColor);
  secondRow.appendChild(actionBadge);

  const rightContent = document.createElement('div');
  rightContent.className = 'flex items-center gap-2 ml-auto shrink-0';

  const clientBadge = createBadge(annotation.clientId || 'unknown', color);
  clientBadge.classList.add('shrink-0');
  rightContent.appendChild(clientBadge);

  const timestamp = document.createElement('div');
  timestamp.className = 'text-xs text-gray-500';
  timestamp.textContent = formatTimestamp(annotation.timestamp);
  rightContent.appendChild(timestamp);

  secondRow.appendChild(rightContent);

  item.appendChild(secondRow);

  return item;
}

export function createAnnotationsListElement(messageSerial: string) {
  const annotationsList = document.createElement('div');
  annotationsList.className = 'space-y-1 max-h-80 overflow-y-auto';
  annotationsList.id = `annotations-list-${messageSerial}`;
  annotationsList.setAttribute('data-message-serial', messageSerial);

  const emptyState = document.createElement('div');
  emptyState.className = 'text-center p-2 text-gray-500 text-sm';
  emptyState.textContent = 'No annotations received yet.';
  emptyState.id = `annotations-empty-${messageSerial}`;

  annotationsList.appendChild(emptyState);

  return annotationsList;
}

export function addAnnotation(annotation: Annotation) {
  const messageSerial = annotation.messageSerial;
  const listContainer = document.getElementById(`annotations-list-${messageSerial}`);

  if (!listContainer) {
    return;
  }

  // Check if we already have an annotation with the same ID and action
  const existingAnnotation = document.querySelector(`[data-id="${annotation.id}"][data-action="${annotation.action || ''}"]`);
  if (existingAnnotation) {
    return;
  }

  const emptyState = document.getElementById(`annotations-empty-${messageSerial}`);
  if (emptyState) {
    emptyState.remove();
  }

  const annotationItem = createAnnotationItem(annotation);
  
  // Add at the beginning (newest first)
  if (listContainer.firstChild) {
    listContainer.insertBefore(annotationItem, listContainer.firstChild);
    return;
  }
  listContainer.appendChild(annotationItem);
}
