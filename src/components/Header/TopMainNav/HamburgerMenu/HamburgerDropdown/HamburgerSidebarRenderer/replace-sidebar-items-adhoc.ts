import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { DropdownData, DropdownDataIdentifier } from '../../../Dropdown';
import { dropdownData } from '../../../Dropdown/Button';

type SidebarDataDropdownDataMapping = {
  sidebarLabel: string;
  dropdownLabel: DropdownDataIdentifier;
};

const mapDropdownDataToSidebarData = (dropdownData: DropdownData): SidebarData => ({
  label: dropdownData.summaryTitle,
  link: dropdownData.summaryLink?.href ?? '',
  content: dropdownData.contents.map((dropdownContent) => ({
    label: dropdownContent.link.text,
    link: dropdownContent.link.href,
  })),
});

export const replaceSidebarItemsAdHoc = (data: SidebarData[], replacements: SidebarDataDropdownDataMapping[]) => {
  const withReplacements = data.map((sidebarItem) => {
    const replacement = replacements.find((replacement) => replacement.sidebarLabel === sidebarItem.label);
    if (replacement && replacement.dropdownLabel) {
      return mapDropdownDataToSidebarData(dropdownData[replacement.dropdownLabel]);
    }
    return sidebarItem;
  });
  return withReplacements;
};
