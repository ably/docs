import React from 'react';

export const SummaryDescription = ({ descriptionText }: { descriptionText: string }) => (
  <p className="px-32" style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
    {descriptionText}
  </p>
);
