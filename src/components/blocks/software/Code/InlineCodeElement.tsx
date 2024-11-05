import React from 'react';

const InlineCodeElement = ({ children, ...props }: { children: React.ReactNode }) => (
  <code {...props} className="ui-text-code-inline">
    {children}
  </code>
);

export default InlineCodeElement;
