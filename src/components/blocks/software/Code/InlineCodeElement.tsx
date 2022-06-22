import React from 'react';

const InlineCodeElement = ({ children, ...props }: { children: React.ReactNode }) => (
  <code {...props} className="font-mono font-semibold text-code p-4">
    {children}
  </code>
);

export default InlineCodeElement;
