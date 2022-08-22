import React from 'react';
import { AblySidebarIcon } from './AblySidebarIcon';

export const AblySidebarIconContainer = () => (
  <div className="fixed bottom-24 bg-extra-light-grey block pl-40 py-24 pb-28 h-64">
    <a href="/">
      <AblySidebarIcon />
    </a>
  </div>
);
