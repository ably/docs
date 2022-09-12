import React from 'react';
import { AblySidebarIcon } from './AblySidebarIcon';

export const AblySidebarIconContainer = () => (
  <div className="fixed bottom-0 bg-extra-light-grey w-1/5 block pl-40 pt-24 pb-28 h-64 border-t border-mid-grey">
    <a href="/">
      <AblySidebarIcon />
    </a>
  </div>
);
