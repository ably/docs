import React from 'react';
import AIChevronDown from '../../../../../styles/svg/ai-chevron-down';

export const DropdownButton = ({ title, setDropdownData }: { title: string; setDropdownData: () => void }) => (
  <button
    type="button"
    data-id="meganav-control"
    className="hidden ui-meganav-link h-32 md:flex items-center group min-w-max self-end"
    aria-expanded="false"
    aria-label={`Show ${title}`}
    onMouseEnter={setDropdownData}
    aria-controls={title}
  >
    <span className="w-full">{title}</span>
    <AIChevronDown className="flex-shrink-0 mx-8" />
  </button>
);
