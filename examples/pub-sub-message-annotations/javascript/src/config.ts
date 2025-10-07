export const urlParams = new URLSearchParams(window.location.search);
export const clientId = urlParams.get('clientId') || 'user2';
// Remember to enable the "Annotations, updates, and deletes" channel rule for the channel
// namespace you're using (the first colon-delimited segment, here, "annotation")
export const channelName = urlParams.get('name') || `annotation:pub-sub-message-annotations`;

export const annotationTypes = [
  { key: 'total.v1', color: 'blue', label: 'Total' },
  { key: 'distinct.v1', color: 'pink', label: 'Distinct' },
  { key: 'unique.v1', color: 'purple', label: 'Unique' },
  { key: 'multiple.v1', color: 'amber', label: 'Multiple' },
  { key: 'flag.v1', color: 'cyan', label: 'Flag' },
];

// Looks up an annotation type by key, returning a fallback gray type if not found
export function findAnnotationType(key: string) {
  return annotationTypes.find((type) => type.key === key) || { key, color: 'gray', label: 'Unknown' };
}
