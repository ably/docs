import React from 'react';
import Html from '../Html';

const Th = ({ data, attribs }) => <th {...attribs}><Html data={ data } /></th>;

export default Th;