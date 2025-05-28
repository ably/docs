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

function createEmptyAnnotationSummaryContentElement() {
  const emptyState = document.createElement('div');
  emptyState.className = 'text-center p-4 text-gray-500 text-sm';
  emptyState.textContent = 'Publish an annotation to view summaries.';
  return emptyState;
}

export function createAnnotationSummaryElement(message: MessageCreate) {
  const annotationSummary = document.createElement('div');
  annotationSummary.className = 'space-y-2 p-4';
  annotationSummary.id = `sections-${message.serial}`;
  annotationSummary.setAttribute('data-serial', message.serial);
  annotationSummary.appendChild(createEmptyAnnotationSummaryContentElement());

  return annotationSummary;
}

function createLabelContainer(label: string, color: string) {
  const container = document.createElement('div');
  container.className = 'flex items-center';

  const labelSpan = document.createElement('span');
  labelSpan.className = `text-xs font-medium text-${color}-800`;
  labelSpan.textContent = label;

  container.appendChild(labelSpan);
  return container;
}

function createSectionHeader(key: string, entry: Ably.SummaryEntry) {
  const { color, label } = findAnnotationType(key);
  const sectionHeader = document.createElement('div');
  sectionHeader.className = `bg-${color}-50 px-3 py-2${key.endsWith('total.v1') ? '' : ' cursor-pointer'}`;

  const wrapper = document.createElement('div');
  wrapper.className = 'flex justify-between items-center';

  const labelContainer = createLabelContainer(label, color);

  if (key.endsWith('total.v1')) {
    const total = (entry as Ably.SummaryTotal).total;
    labelContainer.appendChild(createCountBadge(total, color, false));
    wrapper.appendChild(labelContainer);
  } else if (key.endsWith('flag.v1')) {
    const total = (entry as Ably.SummaryClientIdList).total;
    labelContainer.appendChild(createCountBadge(total, color));
    wrapper.appendChild(labelContainer);
    wrapper.appendChild(createDropdownArrow(color));
  } else {
    const count = Object.keys(entry).length;
    labelContainer.appendChild(createCountBadge(count, color));

    const valueLabel = document.createElement('span');
    valueLabel.className = `ml-1 text-xs text-${color}-600`;
    valueLabel.textContent = `value${count !== 1 ? 's' : ''}`;
    labelContainer.appendChild(valueLabel);

    wrapper.appendChild(labelContainer);
    wrapper.appendChild(createDropdownArrow(color));
  }

  sectionHeader.appendChild(wrapper);
  return sectionHeader;
}

function createFlagCard(entry: Ably.SummaryClientIdList, color: string) {
  const content = document.createElement('div');
  content.className = `p-3 bg-white border-t border-${color}-200`;

  const fromContainer = document.createElement('div');
  fromContainer.className = 'flex items-center';

  const fromLabel = document.createElement('span');
  fromLabel.className = 'text-xs text-gray-500 mr-2';
  fromLabel.textContent = 'From:';

  fromContainer.appendChild(fromLabel);

  const badgesContainer = createClientBadges(entry.clientIds, color);
  fromContainer.appendChild(badgesContainer);

  content.appendChild(fromContainer);
  return content;
}

function createDistinctUniqueCard(value: string, entry: Ably.SummaryClientIdList, color: string) {
  const card = document.createElement('div');
  card.className = `p-3 border-t border-${color}-200`;

  const valueSection = document.createElement('div');
  valueSection.className = 'mb-2';

  const valueHeaderRow = document.createElement('div');
  valueHeaderRow.className = 'flex justify-between items-center';

  const valueContainer = document.createElement('div');
  valueContainer.className = 'flex items-center';

  const valueLabel = document.createElement('span');
  valueLabel.className = 'text-xs text-gray-500 mr-1';
  valueLabel.textContent = 'Value:';

  const valueContent = document.createElement('span');
  valueContent.className = `text-sm font-medium text-${color}-800`;
  valueContent.textContent = value;

  valueContainer.appendChild(valueLabel);
  valueContainer.appendChild(valueContent);

  valueHeaderRow.appendChild(valueContainer);
  valueHeaderRow.appendChild(createCountBadge(entry.total, color));
  valueSection.appendChild(valueHeaderRow);
  card.appendChild(valueSection);

  const fromContainer = document.createElement('div');
  fromContainer.className = 'flex items-center';

  const fromLabel = document.createElement('span');
  fromLabel.className = 'text-xs text-gray-500 mr-2';
  fromLabel.textContent = 'From:';

  fromContainer.appendChild(fromLabel);

  const badgesContainer = createClientBadges(entry.clientIds, color);
  fromContainer.appendChild(badgesContainer);

  card.appendChild(fromContainer);

  return card;
}

function createMultipleCard(value: string, entry: Ably.SummaryMultipleValues[string], color: string) {
  const card = document.createElement('div');
  card.className = `p-3 border-t border-${color}-200`;

  const valueSection = document.createElement('div');
  valueSection.className = 'mb-3';

  const valueHeaderRow = document.createElement('div');
  valueHeaderRow.className = 'flex justify-between items-center';

  const valueContainer = document.createElement('div');
  valueContainer.className = 'flex items-center';

  const valueLabel = document.createElement('span');
  valueLabel.className = 'text-xs text-gray-500 mr-1';
  valueLabel.textContent = 'Value:';

  const valueContent = document.createElement('span');
  valueContent.className = `text-sm font-medium text-${color}-800`;
  valueContent.textContent = value;

  valueContainer.appendChild(valueLabel);
  valueContainer.appendChild(valueContent);

  valueHeaderRow.appendChild(valueContainer);
  valueHeaderRow.appendChild(createCountBadge(entry.total, color));
  valueSection.appendChild(valueHeaderRow);
  card.appendChild(valueSection);

  const fromContainer = document.createElement('div');
  fromContainer.className = 'flex items-start';

  const fromLabel = document.createElement('span');
  fromLabel.className = 'text-xs text-gray-500 mr-2';
  fromLabel.textContent = 'From:';

  fromContainer.appendChild(fromLabel);

  const badgesContainer = document.createElement('div');
  badgesContainer.className = 'flex-1';
  badgesContainer.appendChild(createClientBadgesWithCounts(entry.clientIds || {}, color));
  fromContainer.appendChild(badgesContainer);

  card.appendChild(fromContainer);

  if (entry.totalUnidentified > 0) {
    const unidentifiedContainer = document.createElement('div');
    unidentifiedContainer.appendChild(createBadgeWithCount('Unidentified', entry.totalUnidentified, color));
    card.appendChild(unidentifiedContainer);
  }

  return card;
}

function createSectionContent(typeKey: string, entry: Ably.SummaryEntry) {
  const { color } = findAnnotationType(typeKey);
  const sectionContent = document.createElement('div');
  sectionContent.className = 'bg-white';

  if (typeKey.endsWith('flag.v1')) {
    sectionContent.appendChild(createFlagCard(entry as Ably.SummaryClientIdList, color));
  } else if (typeKey.endsWith('distinct.v1') || typeKey.endsWith('unique.v1')) {
    for (const [value, info] of Object.entries(entry as Ably.SummaryUniqueValues | Ably.SummaryDistinctValues)) {
      sectionContent.appendChild(createDistinctUniqueCard(value, info, color));
    }
  } else if (typeKey.endsWith('multiple.v1')) {
    for (const [value, info] of Object.entries(entry as Ably.SummaryMultipleValues)) {
      sectionContent.appendChild(createMultipleCard(value, info, color));
    }
  }

  return sectionContent;
}

export function createSection(key: string, entry: Ably.SummaryEntry, wasExpanded: boolean) {
  const { color } = findAnnotationType(key);

  const section = document.createElement('div');
  section.className = `border border-${color}-200 rounded-md overflow-hidden`;
  section.setAttribute('data-type', key);

  const sectionHeader = createSectionHeader(key, entry);
  section.appendChild(sectionHeader);

  if (key.endsWith('total.v1')) {
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

  sectionHeader.addEventListener('click', () => {
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
  const hasAnnotations = annotationTypes.some((type) => message.summary && message.summary[`${annotationNamespace}:${type.key}`]);

  if (!hasAnnotations) {
    sectionsContainer.appendChild(createEmptyAnnotationSummaryContentElement());
    return;
  }

  for (const { key } of annotationTypes) {
    const entry = message.summary[`${annotationNamespace}:${key}`];
    if (!entry) {
      continue;
    }

    const section = createSection(key, entry, expandedStates[key]);
    sectionsContainer.appendChild(section);
  }
}
