import { DropdownData } from '../Header/TopMainNav/Dropdown';

export type SidebarData = {
  content?: SidebarData[];
  parent?: SidebarData;
  label: string;
  link: string;
  level?: number;
  closed?: boolean;
  dropdownData?: DropdownData;
};

export enum EXPAND_MENU {
  EXPANDED,
  COLLAPSED,
  SECTION_MATCH,
  EXPAND_NEXT,
  COLLAPSE_NEXT,
}
