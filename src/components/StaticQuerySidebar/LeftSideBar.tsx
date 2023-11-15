import { EXPAND_MENU, Sidebar } from 'src/components';
import { SidebarDataRetrieval } from './SidebarDataRetrieval';
import { SidebarName } from '../Sidebar/types';

type LeftSidebarProps = {
  className?: string;
  languages?: boolean;
  sidebarName: SidebarName;
  collapsible?: boolean;
};

const LeftSideBar = ({ sidebarName, className = '', languages = false, collapsible = false }: LeftSidebarProps) => {
  return (
    <SidebarDataRetrieval
      className={className}
      languages={languages}
      expandMenu={EXPAND_MENU.SECTION_MATCH}
      sidebarName={sidebarName}
      Component={Sidebar}
      collapsible={collapsible}
    />
  );
};

export { LeftSideBar, LeftSidebarProps };
