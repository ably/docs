import React from 'react';
import TopCodeMenu from '../Menu/TopCodeMenu';
import { VersionMenuProps } from '../Menu/VersionMenu';
import { TopMainNav } from './TopMainNav';

const Header = ({ languages, versionData }: { languages: string[]; versionData: VersionMenuProps }) => {
  return (
    <>
      <TopMainNav />
      <TopCodeMenu languages={languages} versionData={versionData} />
    </>
  );
};

export default Header;
