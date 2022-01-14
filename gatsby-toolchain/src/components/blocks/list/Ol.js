import React from 'react';
import Html from '../Html';

const Ol = ({ data, attribs }) => <ol {...attribs}><Html data={ data } /></ol>;

export default Ol;