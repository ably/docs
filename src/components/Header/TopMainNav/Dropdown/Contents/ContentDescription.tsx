import React from 'react';

export const ContentDescription = (
  { children }: { children: React.ReactNode }, // Tailwind 'text-sm' class does not apply
) => <p style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>{children}</p>;
