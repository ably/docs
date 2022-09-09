import { SidebarData } from '../../../../../Sidebar/sidebar-data';

const ADHOC_SIDEBAR_EXCLUSIONS = ['API Reference', 'Useful Resources'];

export const removeAdhocSidebarItems = (sidebarData: SidebarData[]) =>
  sidebarData.filter((sidebarItem: SidebarData) => !ADHOC_SIDEBAR_EXCLUSIONS.includes(sidebarItem.label));
