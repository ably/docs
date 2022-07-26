import React from 'react';
import { DropdownDataIdentifier } from '../types';

export const DropdownButton = ({
  title,
  setDropdownData,
  clearDropdownData,
}: {
  title: DropdownDataIdentifier;
  setDropdownData: () => void;
  clearDropdownData: () => void;
}) => (
  <button
    type="button"
    data-id="meganav-control"
    className={`ui-meganav-link h-64 flex items-center group`}
    aria-expanded="false"
    aria-label={`Show ${title}`}
    onMouseEnter={setDropdownData}
  >
    {title}
    {/* Take this arrow from the sidebar menu */}
  </button>
);
