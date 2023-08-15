import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';

import { Container } from 'src/components';
import TopCodeMenu from 'src/components/Menu/TopCodeMenu';

import { Header } from '../Header';
import { VersionMenuProps } from '../Menu/VersionMenu';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Footer } from '../Footer';

const Layout: FC<{ languages?: Array<string>; versionData?: VersionMenuProps; isExtraWide?: boolean }> = ({
  languages,
  versionData,
  children,
  isExtraWide = false,
}) => {

  return (
    <GlobalLoading>
      <Header />
      <Container
        as="main"
        className={cn('grid grid-cols-1 mx-auto max-w-1264', {
          ['md:grid-cols-two-col-layout']: isExtraWide,
          ['md:grid-cols-layout xxl:grid-cols-large-layout']: !isExtraWide,
        })}
      >
        {languages &&  languages.length > 0 && versionData && (
          <TopCodeMenu languages={languages} versionData={versionData} />
        )}
        {children}
      </Container>
      <div className="grid grid-cols-1 md:grid-cols-footer-layout">
        <Footer />
      </div>
    </GlobalLoading>
  );
};

export default Layout;
