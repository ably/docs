import React from 'react';
import Html from '../Html';

const Tfoot = ({ data, attribs }) => <tfoot {...attribs}><Html data={ data } /></tfoot>;

export default Tfoot;