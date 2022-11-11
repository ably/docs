import React, { FunctionComponent as FC } from 'react';
import cn from 'classnames';
import { Container } from 'src/components';
import { Header } from '../Header';
import { VersionMenuProps } from '../Menu/VersionMenu';
import { LeftSideBar } from '../StaticQuerySidebar';
import TopCodeMenu from '../Menu/TopCodeMenu';
import GlobalLoading from '../GlobalLoading/GlobalLoading';
import { Footer } from '../Footer';

const Layout: FC<{ languages: Array<string>; versionData: VersionMenuProps }> = ({
  languages,
  versionData,
  children,
}) => {
  const languageAlternativesExist = (languages && languages.length > 1) || (versionData && versionData.versions.length);
  return (
    <GlobalLoading>
      <Header />
      <TopCodeMenu languages={languages} versionData={versionData} />

      <div className="flex">
        <LeftSideBar />
        <Container
          as="main"
          className={cn('md:ml-24 flex ml-auto', {
            'pt-128': languageAlternativesExist,
            'pt-96': !languageAlternativesExist,
          })}
        >
          {children}
        </Container>
      </div>
      <Footer />
    </GlobalLoading>
  );
};

export default Layout;
