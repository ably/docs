import { EXPAND_MENU } from './expand-menu-enum';
import { SidebarData } from './sidebar-data';

export type SidebarProps = {
  data: SidebarData[];
  className: string;
  title?: string | null;
  languages: boolean;
  interactableLinkMenu: boolean;
  expandMenu?: EXPAND_MENU;
};
