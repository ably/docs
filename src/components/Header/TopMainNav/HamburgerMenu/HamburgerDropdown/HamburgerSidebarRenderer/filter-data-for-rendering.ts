import { omit } from 'lodash/fp';
import { SidebarData } from '../../../../../Sidebar/sidebar-data';
import { ExpandedMenu } from './hamburger-expanded-menu-context';

const filterDataForRendering = (data: SidebarData[], expandedMenu: ExpandedMenu) => {
  if (expandedMenu.length === 0) {
    return data.map(omit(['content']));
  }
  let i = expandedMenu.length;
};
