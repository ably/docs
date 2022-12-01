import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';

import { Container } from 'src/components';
import TopCodeMenu from 'src/components/Menu/TopCodeMenu';

import { Header } from '../Header';
import { VersionMenuProps } from '../Menu/VersionMenu';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Footer } from '../Footer';

import { container, extraWide, regular } from './Layout.module.css';

const Layout: FC<{ languages?: Array<string>; versionData?: VersionMenuProps; isExtraWide?: boolean }> = ({
  languages,
  versionData,
  children,
  isExtraWide = false,
}) => {
  return (
    <GlobalLoading>
      <Header />
      {languages && versionData && <TopCodeMenu languages={languages} versionData={versionData} />}
      <Container
        as="main"
        className={cn(container, {
          [extraWide]: isExtraWide,
          [regular]: !isExtraWide,
        })}
      >
        {children}
      </Container>
      <Footer />
    </GlobalLoading>
  );
};

export default Layout;
