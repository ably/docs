// Handles the display and management of message annotation summaries

import * as Ably from 'ably';
import { MessageCreate, MessageSummary } from '../types';
import { annotationTypes, findAnnotationType, annotationNamespace } from '../config';
import { createDropdownArrow, rotateArrow, toggleArrowRotation } from './arrow';
import {
  createCountBadge,
  createClientBadges,
  createClientBadgesWithCounts,
  createClientBadgeWithCount,
} from './badge';

function createEmptyAnnotationSummaryContentElement() {
  const emptyState = document.createElement('div');
  emptyState.className = 'text-center p-4 text-gray-500 text-sm';
  emptyState.textContent = 'Publish an annotation to view summaries.';
  return emptyState;
}

export function createAnnotationSummaryElement(message: MessageCreate) {
  const annotationSummary = document.createElement('div');
  annotationSummary.className = 'bg-white shadow-sm rounded-lg p-4 mb-4';
  annotationSummary.id = `summary-container-${message.serial}`;
  annotationSummary.setAttribute('data-serial', message.serial);

  const header = document.createElement('div');
  header.className = 'mb-3';
  header.innerHTML = `<h3 class="text-sm font-medium text-gray-900">Annotation Summary</h3>`;
  annotationSummary.appendChild(header);

  const sectionsContainer = document.createElement('div');
  sectionsContainer.className = 'space-y-2';
  sectionsContainer.id = `sections-${message.serial}`;
  sectionsContainer.appendChild(createEmptyAnnotationSummaryContentElement());

  annotationSummary.appendChild(sectionsContainer);
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
  content.appendChild(createClientBadges(entry.clientIds, color));
  return content;
}

function createDistinctUniqueCard(value: string, entry: Ably.SummaryClientIdList, color: string) {
  const card = document.createElement('div');
  card.className = `p-3 border-t border-${color}-200`;

  const header = document.createElement('div');
  header.className = 'flex justify-between items-center';

  const valueLabel = document.createElement('span');
  valueLabel.className = `text-sm font-medium text-${color}-800`;
  valueLabel.textContent = value;

  header.appendChild(valueLabel);
  header.appendChild(createCountBadge(entry.total, color));

  card.appendChild(header);
  card.appendChild(createClientBadges(entry.clientIds, color));

  return card;
}

function createMultipleCard(value: string, entry: Ably.SummaryMultipleValues[string], color: string) {
  const card = document.createElement('div');
  card.className = `p-3 border-t border-${color}-200`;

  const header = document.createElement('div');
  header.className = 'flex justify-between items-center';

  const valueLabel = document.createElement('span');
  valueLabel.className = `text-sm font-medium text-${color}-800`;
  valueLabel.textContent = value;

  header.appendChild(valueLabel);
  header.appendChild(createCountBadge(entry.total, color));
  card.appendChild(header);

  const clientBadgesContainer = document.createElement('div');
  clientBadgesContainer.className = 'mt-2';
  clientBadgesContainer.appendChild(createClientBadgesWithCounts(entry.clientIds || {}, color));
  card.appendChild(clientBadgesContainer);

  if (entry.totalUnidentified > 0) {
    const unidentifiedContainer = document.createElement('div');
    unidentifiedContainer.className = 'mt-2';
    unidentifiedContainer.appendChild(createClientBadgeWithCount('Unidentified', entry.totalUnidentified, color));
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
  const summaryContainer = document.getElementById(`summary-container-${message.serial}`);
  if (!summaryContainer) {
    return;
  }

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

  const hasAnnotations = annotationTypes.some((type) => message.summary[`${annotationNamespace}:${type.key}`]);

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
