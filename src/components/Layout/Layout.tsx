import React, { FunctionComponent as FC } from 'react';

import { Container } from 'src/components';
import TopCodeMenu from 'src/components/Menu/TopCodeMenu';

import { Header } from '../Header';
import { VersionMenuProps } from '../Menu/VersionMenu';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Footer } from '../Footer';

import { container } from './Layout.module.css';

const Layout: FC<{ languages?: Array<string>; versionData?: VersionMenuProps }> = ({
  languages,
  versionData,
  children,
}) => {
  return (
    <GlobalLoading>
      <Header />
      {languages && versionData && <TopCodeMenu languages={languages} versionData={versionData} />}
      <Container as="main" className={container}>
        {children}
      </Container>
      <Footer />
    </GlobalLoading>
  );
};

export default Layout;
