import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { DropdownData, DropdownDataIdentifier } from '../../../Dropdown';
import { dropdownData } from '../../../Dropdown/Button';

const ADHOC_SIDEBAR_INCLUSIONS: DropdownDataIdentifier[] = ['API References', 'Resources'];

const mapDropdownDataToSidebarData = (dropdownData: DropdownData): SidebarData => ({
  label: dropdownData.summaryTitle,
  link: dropdownData.summaryLink?.href ?? '',
  content: dropdownData.contents.map((dropdownContent) => ({
    label: dropdownContent.link.text,
    link: dropdownContent.link.href,
  })),
  dropdownData: dropdownData,
});

export const addAdhocSidebarItems = (data: SidebarData[]) => {
  const dropdownDataItems = ADHOC_SIDEBAR_INCLUSIONS.map(
    (dropdownDataID) => dropdownDataID && dropdownData[dropdownDataID],
  );
  const sidebarItems = dropdownDataItems.map(mapDropdownDataToSidebarData);
  const withReplacements = data.concat(sidebarItems);
  return withReplacements;
};
