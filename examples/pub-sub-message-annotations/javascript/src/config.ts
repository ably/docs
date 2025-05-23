export const urlParams = new URLSearchParams(window.location.search);
export const clientId = urlParams.get('clientId') || 'user2';
export const channelName = urlParams.get('name') || 'mutable:pub-sub-message-annotations';
export const annotationNamespace = 'my-annotations';

export const annotationTypes = [
  { key: 'total.v1', color: 'blue', label: 'Total' },
  { key: 'distinct.v1', color: 'green', label: 'Distinct' },
  { key: 'unique.v1', color: 'purple', label: 'Unique' },
  { key: 'multiple.v1', color: 'amber', label: 'Multiple' },
  { key: 'flag.v1', color: 'red', label: 'Flag' },
];

export function findAnnotationType(key: string) {
  return annotationTypes.find((type) => type.key === key) || { key, color: 'gray', label: 'Unknown' };
}
