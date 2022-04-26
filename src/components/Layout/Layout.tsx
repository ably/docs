import React, { FunctionComponent as FC } from 'react';
import Header from '../Header';

const Layout: FC<{ languages: Array<string> }> = ({ languages, children }) => (
  <>
    <header>
      <Header languages={languages} />
    </header>
    <main className={`${languages && languages.length > 1 ? 'pt-128' : 'pt-96'} grid grid-cols-5`}>{children}</main>
  </>
);

export default Layout;
