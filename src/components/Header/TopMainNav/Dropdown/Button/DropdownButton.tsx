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
    <div id={createDropdownButtonMenuHtmlId(dropdownDataID)} onMouseLeave={() => onMouseOut(dropdownDataID)}>
      <button
        type="button"
        data-id="meganav-control"
        className="hidden ui-meganav-link h-32 md:flex items-center group min-w-max self-end pt-22 pb-32 mx-0 px-12"
        aria-expanded={isOpen}
        aria-label={`Show ${dropdownDataID}`}
        onClick={() => onActivated(dropdownDataID)}
        onMouseOver={() => onMouseOver(dropdownDataID)}
        aria-controls={dropdownDataID}
      >
        <span className="w-full">{titleOverride || dropdownDataID}</span>
        <Icon name="icon-gui-disclosure-arrow" size="1rem" additionalCSS={chevronDown} />
      </button>
      {isOpen && <DropdownMenu {...dropdownData[dropdownDataID]} />}
    </div>
  );
};
