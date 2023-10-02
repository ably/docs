import { EXPAND_MENU, Sidebar } from 'src/components';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';
import { SidebarName } from './types';

export type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
  sidebarName: SidebarName;
};

const LeftSideBar = ({ sidebarName, className = '', languages = false, collapsed = false }: LeftSidebarProps) => {
  return (
    <SidebarDataRetrieval
      className={className}
      languages={languages}
      expandMenu={EXPAND_MENU.SECTION_MATCH}
      sidebarName={sidebarName}
      Component={Sidebar}
    />
  );
};

export { LeftSideBar };
