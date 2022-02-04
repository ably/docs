import React from 'react';
import Header from '../Header';

const Layout = ({ languages, children }) => (<>
    <header>
        <Header languages={ languages } />
    </header>
    <main className={`pt-64 grid grid-cols-5`}>
        {children}
    </main>
</>);

export default Layout;
