import React from 'react';
import Html from '../Html';

const Li = ({ data, attribs }) => <li {...attribs}><Html data={ data } /></li>;

export default Li;