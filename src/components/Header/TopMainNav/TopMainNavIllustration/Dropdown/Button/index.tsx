import React from 'react';
import { DropdownData } from '../types';

export const DropdownButton = ({
  dropdownData,
  setDropdownData,
}: {
  dropdownData: DropdownData;
  setDropdownData: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    data-id="meganav-control"
    className={`ui-meganav-link h-64 flex items-center group`}
    aria-expanded="false"
    aria-label={`Show ${dropdownData.summaryTitle}`}
    onClick={setDropdownData}
  >
    {dropdownData.summaryTitle}
    {/* Take this arrow from the sidebar menu */}
  </button>
);
