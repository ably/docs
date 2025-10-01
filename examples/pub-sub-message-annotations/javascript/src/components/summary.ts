// Handles the display and management of message annotation summaries

import * as Ably from 'ably';
import { MessageCreate, MessageSummary } from '../types';
import { annotationTypes, findAnnotationType, annotationNamespace } from '../config';
import { createDropdownArrow, rotateArrow, toggleArrowRotation } from './arrow';
import {
  createCountBadge,
  createClientBadges,
  createClientBadgesWithCounts,
  createBadgeWithCount,
} from './badge';
import { getAnnotationTypeKey } from './annotations';

function createEmptyAnnotationSummaryContentElement() {
  const emptyState = document.createElement('div');
  emptyState.className = 'text-center py-2 text-gray-500 text-sm';
  emptyState.textContent = 'Publish an annotation to view summaries.';
  return emptyState;
}

export function createAnnotationSummaryElement(message: MessageCreate) {
  const annotationSummary = document.createElement('div');
  annotationSummary.className = 'space-y-1';
  annotationSummary.id = `sections-${message.serial}`;
  annotationSummary.setAttribute('data-serial', message.serial);
  annotationSummary.appendChild(createEmptyAnnotationSummaryContentElement());

  return annotationSummary;
}

function createLabelContainer(label: string, color: string) {
  const container = document.createElement('div');
  container.className = 'flex items-center';

  const labelSpan = document.createElement('span');
  labelSpan.className = `text-sm font-medium text-${color}-800`;
  labelSpan.textContent = label;

  container.appendChild(labelSpan);
  return container;
}

function createSectionHeader(key: string, entry: Ably.SummaryEntry) {
  const typeKey = getAnnotationTypeKey(key);
  const { color, label } = findAnnotationType(typeKey);
  const sectionHeader = document.createElement('div');
  sectionHeader.className = `border-l-4 border-l-${color}-500 border-t border-r border-gray-200 bg-white shadow-sm px-3 py-1.5 ${typeKey === 'total.v1' ? '' : 'cursor-pointer'}`;

  const wrapper = document.createElement('div');
  wrapper.className = 'flex justify-between items-center';

  const labelContainer = createLabelContainer(label, color);

  if (typeKey === 'total.v1') {
    const total = (entry as Ably.SummaryTotal).total;
    labelContainer.appendChild(createCountBadge(total, color));
    wrapper.appendChild(labelContainer);
  } else if (typeKey === 'flag.v1') {
    const total = (entry as Ably.SummaryClientIdList).total;
    labelContainer.appendChild(createCountBadge(total, color));
    wrapper.appendChild(labelContainer);
    wrapper.appendChild(createDropdownArrow('gray'));
  } else {
    const count = Object.keys(entry).length;
    labelContainer.appendChild(createCountBadge(count, color));

    const valueLabel = document.createElement('span');
    valueLabel.className = `ml-1 text-xs text-gray-600`;
    labelContainer.appendChild(valueLabel);

    wrapper.appendChild(labelContainer);
    wrapper.appendChild(createDropdownArrow('gray'));
  }

  sectionHeader.appendChild(wrapper);
  return sectionHeader;
}

function createFlagCard(entry: Ably.SummaryClientIdList, color: string) {
  const card = document.createElement('div');
  card.className = 'p-3 bg-white flex items-center gap-2';

  // Add empty spacer for alignment
  const spacer = document.createElement('span');
  spacer.className = 'flex-shrink-0 mr-auto';
  card.appendChild(spacer);

  // Add client badges
  const badgesContainer = createClientBadges(entry.clientIds, 'gray');
  badgesContainer.className = 'flex flex-wrap gap-1 items-center justify-end';
  card.appendChild(badgesContainer);

  // Add count badge
  const countBadge = createCountBadge(entry.total, color);
  countBadge.className = countBadge.className + ' ml-2 flex-shrink-0';
  card.appendChild(countBadge);

  return card;
}

function createDistinctUniqueCard(value: string, entry: Ably.SummaryClientIdList, color: string) {
  const card = document.createElement('div');
  card.className = 'p-3 bg-white flex items-center gap-2';

  // Add value text
  const valueContent = document.createElement('span');
  valueContent.className = 'text-sm text-gray-700 flex-shrink-0 mr-auto';
  valueContent.textContent = value;
  card.appendChild(valueContent);

  // Add client badges
  const badgesContainer = createClientBadges(entry.clientIds, 'gray');
  badgesContainer.className = 'flex flex-wrap gap-1 items-center justify-end';
  card.appendChild(badgesContainer);

  // Add count badge
  const countBadge = createCountBadge(entry.total, color);
  countBadge.className = countBadge.className + ' ml-2 flex-shrink-0';
  card.appendChild(countBadge);

  return card;
}

function createMultipleCard(value: string, entry: Ably.SummaryMultipleValues[string], color: string) {
  const card = document.createElement('div');
  card.className = 'p-3 bg-white flex items-center gap-2';

  // Add value text
  const valueContent = document.createElement('span');
  valueContent.className = 'text-sm text-gray-700 flex-shrink-0 mr-auto';
  valueContent.textContent = value;
  card.appendChild(valueContent);

  // Badge container for client badges
  const badgeWrapper = document.createElement('div');
  badgeWrapper.className = 'flex flex-wrap gap-1 items-center justify-end';

  // Add client badges with counts and unidentified badge if needed
  badgeWrapper.appendChild(createClientBadgesWithCounts(entry.clientIds || {}, 'gray'));
  if (entry.totalUnidentified > 0) {
    badgeWrapper.appendChild(createBadgeWithCount('Unidentified', entry.totalUnidentified, 'gray'));
  }

  card.appendChild(badgeWrapper);

  // Add count badge
  const countBadge = createCountBadge(entry.total, color);
  countBadge.className = countBadge.className + ' ml-2 flex-shrink-0';
  card.appendChild(countBadge);

  return card;
}

function createSectionContent(fullTypeKey: string, entry: Ably.SummaryEntry) {
  const typeKey = getAnnotationTypeKey(fullTypeKey);
  const { color } = findAnnotationType(typeKey);
  const sectionContent = document.createElement('div');
  sectionContent.className = `overflow-hidden border-l-4 border-l-${color}-500 border-b border-r border-gray-200`;

  if (typeKey === 'flag.v1') {
    const card = createFlagCard(entry as Ably.SummaryClientIdList, color);
    sectionContent.appendChild(card);
  } else if (typeKey === 'distinct.v1' || typeKey === 'unique.v1') {
    const entries = Object.entries(entry as Ably.SummaryUniqueValues | Ably.SummaryDistinctValues);
    entries.forEach((entryData, index) => {
      const [value, info] = entryData;
      const card = createDistinctUniqueCard(value, info, color);
      if (index < entries.length - 1) {
        card.classList.add('border-b', 'border-gray-100');
      }
      sectionContent.appendChild(card);
    });
  } else if (typeKey === 'multiple.v1') {
    const entries = Object.entries(entry as Ably.SummaryMultipleValues);
    entries.forEach((entryData, index) => {
      const [value, info] = entryData;
      const card = createMultipleCard(value, info, color);
      if (index < entries.length - 1) {
        card.classList.add('border-b', 'border-gray-100');
      }
      sectionContent.appendChild(card);
    });
  }

  return sectionContent;
}

export function createSection(key: string, entry: Ably.SummaryEntry, wasExpanded: boolean) {
  const section = document.createElement('div');
  section.setAttribute('data-type', key);

  const sectionHeader = createSectionHeader(key, entry);
  section.appendChild(sectionHeader);

  const typeKey = getAnnotationTypeKey(key);
  if (typeKey === 'total.v1') {
    return section;
  }

  const sectionContent = createSectionContent(key, entry);
  section.appendChild(sectionContent);

  const shouldExpand = wasExpanded !== false;
  section.setAttribute('data-expanded', `${shouldExpand}`);

  if (!shouldExpand) {
    sectionContent.classList.add('hidden');
  }

  const arrow = sectionHeader.querySelector('svg');
  if (arrow instanceof SVGElement) {
    rotateArrow(arrow, shouldExpand);
  }

  sectionHeader.addEventListener('click', (e) => {
    e.preventDefault();
    sectionContent.classList.toggle('hidden');

    if (arrow instanceof SVGElement) {
      const isExpanded = toggleArrowRotation(arrow);
      section.setAttribute('data-expanded', `${isExpanded}`);
    }
  });

  return section;
}

export function updateAnnotationSummary(message: MessageSummary) {
  const sectionsContainer = document.getElementById(`sections-${message.serial}`);
  if (!sectionsContainer) {
    return;
  }

  // Preserve expansion states before rebuilding
  const expandedStates: Record<string, boolean> = {};
  for (const section of sectionsContainer.querySelectorAll('[data-type]')) {
    const type = section.getAttribute('data-type');
    if (type) {
      expandedStates[type] = section.getAttribute('data-expanded') === 'true';
    }
  }

  sectionsContainer.innerHTML = '';
  const hasAnnotations = annotationTypes.some((type) => message.annotations.summary && message.annotations.summary[`${annotationNamespace}:${type.key}`]);

  if (!hasAnnotations) {
    sectionsContainer.appendChild(createEmptyAnnotationSummaryContentElement());
    return;
  }

  for (const { key } of annotationTypes) {
    const entry = message.annotations.summary[`${annotationNamespace}:${key}`];
    if (!entry) {
      continue;
    }

    const section = createSection(key, entry, expandedStates[key]);
    sectionsContainer.appendChild(section);
  }
}
