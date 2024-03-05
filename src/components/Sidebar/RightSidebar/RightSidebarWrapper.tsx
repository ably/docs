import cn from 'classnames';
import TopCodeMenu from 'src/components/Menu/TopCodeMenu';
import { RightSidebar } from './RightSidebar';
import { RightSidebarMobile } from './RightSidebarMobile';
import { MenuData } from './menu-data';
import { VersionMenuProps } from '../../Menu/VersionMenu';
import { rightSidebarWrapperDesktop } from './RightSidebar.module.css';
import { useMediaQuery } from '@react-hook/media-query';

const useScreenSize = () => {
  return useMediaQuery('only screen and (min-width: 1040px)');
};

type RightSidebarWrapperProps = {
  menuData: MenuData[];
  languages?: string[];
  versionData?: VersionMenuProps;
};

export const RightSidebarWrapper = ({ menuData, languages, versionData }: RightSidebarWrapperProps) => {
  const languagesExist = languages && languages.length > 0;
  const isDesktop = useScreenSize();

  return (
    <div
      className={cn(
        'fixed md:sticky top-112 left-0 right-0 bg-white flex flex-row md:flex-col justify-between md:justify-start z-1 h-72 md:h-screen overflow-x-hidden',
        {
          [rightSidebarWrapperDesktop]: isDesktop,
        },
      )}
    >
      <RightSidebarMobile menuData={menuData} languages={Boolean(languagesExist)} />
      {languagesExist && versionData && <TopCodeMenu languages={languages} versionData={versionData} />}
      <RightSidebar languages={Boolean(languagesExist)} menuData={menuData} />
    </div>
  );
};
