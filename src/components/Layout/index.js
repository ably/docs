import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import { ChildPropTypes } from '../../react-utilities';

const Layout = ({ languages, children }) => (
  <>
    <header>
      <Header languages={languages} />
    </header>
    <main className={`pt-128 grid grid-cols-5`}>{children}</main>
  </>
);

Layout.propTypes = {
  languages: PropTypes.array,
  children: ChildPropTypes,
};

export default Layout;