import React, { FunctionComponent as FC } from 'react';
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
  const languageAlternativesExist = languages && languages.length > 1;
  return (
    <GlobalLoading>
      <Header />
      <div className="grid md:grid-cols-5 2xl:grid-cols-7">
        <LeftSideBar className="col-span-1 bg-extra-light-grey px-24" />
        <TopCodeMenu languages={languages} versionData={versionData} />
        <main
          className={`${
            languageAlternativesExist ? 'pt-128' : 'pt-96'
          } md:ml-24 col-span-4 grid grid-cols-4 2xl:grid-cols-7 2xl:col-span-6`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </GlobalLoading>
  );
};

export default Layout;
