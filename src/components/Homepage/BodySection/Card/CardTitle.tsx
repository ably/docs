import React from 'react';

export const CardTitle = ({ title }: { title: string }) => (
  <h4
    style={{
      fontSize: '24px',
    }}
    className="font-medium mb-24 tracking-tight"
  >
    {title}
  </h4>
);
