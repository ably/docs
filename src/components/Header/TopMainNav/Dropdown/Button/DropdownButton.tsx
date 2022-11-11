import { kebabCase } from 'lodash';
import React from 'react';
import Icon from '@ably/ui/core/Icon';
import { DropdownMenu } from '../DropdownMenu';
import { DropdownDataIdentifier } from '../types';
import { dropdownData } from './dropdown-data';

import { chevronDown } from './DropdownButton.module.css';

export type DropDownEvent = (dataId: DropdownDataIdentifier) => void;

export const createDropdownButtonMenuHtmlId = (dropdownDataID: DropdownDataIdentifier) =>
  `${kebabCase(dropdownDataID)}-button-menu`;

export const DropdownButtonAndMenu = ({
  dropdownDataID,
  isOpen,
  onActivated,
  onMouseOver,
  onMouseOut,
  titleOverride,
}: {
  dropdownDataID: DropdownDataIdentifier;
  isOpen: boolean;
  onActivated: DropDownEvent;
  onMouseOver: DropDownEvent;
  onMouseOut: DropDownEvent;
  titleOverride?: string;
}) => {
  return (
    <div
      id={createDropdownButtonMenuHtmlId(dropdownDataID)}
      onMouseLeave={() => onMouseOut(dropdownDataID)}
      className="mr-24 py-24"
    >
      <button
        type="button"
        data-id="meganav-control"
        className="hidden md:flex items-center h-full"
        aria-expanded={isOpen}
        aria-label={`Show ${dropdownDataID}`}
        onClick={() => onActivated(dropdownDataID)}
        onMouseOver={() => onMouseOver(dropdownDataID)}
        aria-controls={dropdownDataID}
      >
        <span>{titleOverride || dropdownDataID}</span>
        <Icon name="icon-gui-disclosure-arrow" size="1.5rem" additionalCSS={chevronDown} />
      </button>
      {isOpen && <DropdownMenu {...dropdownData[dropdownDataID]} />}
    </div>
  );
};
