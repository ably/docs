import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';

import { Container } from 'src/components';

import { Header } from '../Header';
import { LeftSideBar } from 'src/components/StaticQuerySidebar';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Footer } from '../Footer';

const Layout: FC<{ isExtraWide?: boolean }> = ({ children, isExtraWide = false }) => {
  return (
    <GlobalLoading>
      <Header />
      <LeftSideBar />
      <Container
        as="main"
        className={cn('grid md:ml-244 2xl:mx-auto max-w-1264', {
          ['md:grid-cols-1']: isExtraWide,
          ['md:grid-cols-2 md:grid-cols-layout']: !isExtraWide,
        })}
      >
        {children}
      </Container>
      <div className="grid grid-cols-1 md:grid-cols-footer-layout">
        <Footer />
      </div>
    </GlobalLoading>
  );
};

export default Layout;
