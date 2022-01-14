import React from 'react';
import Html from '../Html';

const Header = ({ data, attribs }) => <header {...attribs}><Html data={ data } /></header>;

export default Header;