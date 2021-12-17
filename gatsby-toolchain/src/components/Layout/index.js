import React from 'react';
import Header from '../Header';

const Layout = ({children}) => (<>
    <title>Documentation</title>
    <header>
        <Header />
    </header>
    <main className={`pt-64`}>
        {children}
    </main>
</>);

export default Layout;
