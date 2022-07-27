import React from 'react';
import { dropdownData } from './dropdown-data';

export const DropdownButton = ({
  title,
  setDropdownData,
}: {
  title: keyof typeof dropdownData;
  setDropdownData: () => void;
}) => (
  <button
    type="button"
    data-id="meganav-control"
    className={`ui-meganav-link h-64 flex items-center group`}
    aria-expanded="false"
    aria-label={`Show ${title}`}
    onMouseEnter={setDropdownData}
    aria-control={title}
  >
    {title}
    {/* Take this arrow from the sidebar menu */}
  </button>
);
