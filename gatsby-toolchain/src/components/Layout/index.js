import React from 'react';
import Header from '../Header';

const Layout = ({children}) => (<>
    <title>Documentation</title>
    <header>
        <Header />
    </header>
    <main className={`pt-64 grid grid-cols-5`}>
        {children}
    </main>
</>);

export default Layout;
