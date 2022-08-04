import React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Meganav from '@ably/ui/core/Meganav';
import TopCodeMenu from '../Menu/TopCodeMenu';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import ablyStack from '@ably/ui/core/images/ably-stack.svg';
import { VersionData } from '../Menu/VersionMenu';

const Header = ({ languages, versionData }: { languages: Array<string>; versionData: VersionData }) => {
  return (
    <>
      <Meganav
        paths={{
          ablyStack,
        }}
      />
      <TopCodeMenu languages={languages} versionData={versionData} />
    </>
  );
};

export default Header;
