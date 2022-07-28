import React from 'react';
import { dropdownData } from './dropdown-data';

export const DropdownButton = ({
  title,
  setDropdownData,
}: {
  title: keyof typeof dropdownData | string;
  setDropdownData: () => void;
}) => (
  <button
    type="button"
    data-id="meganav-control"
    className="ui-meganav-link h-32 flex items-center group min-w-max"
    aria-expanded="false"
    aria-label={`Show ${title}`}
    onMouseEnter={setDropdownData}
    aria-controls={title}
  >
    <span className="w-full">{title}</span>
    <svg width="16"></svg>
  </button>
);
