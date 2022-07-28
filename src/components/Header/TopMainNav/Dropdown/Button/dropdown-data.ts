import { AccountPanelDropdownData } from './account-panel';
import { APIReferencesDropdownData } from './api-references';
import { ResourcesDropDownData } from './resource-data';

export const dropdownData = {
  'API References': APIReferencesDropdownData,
  Resources: ResourcesDropDownData,
  'Your Account': AccountPanelDropdownData,
} as const;
