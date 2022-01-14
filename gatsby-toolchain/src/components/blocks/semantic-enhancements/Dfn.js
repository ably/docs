import React from 'react';
import Html from '../Html';

const Dfn = ({ data, attribs }) => <dfn {...attribs}><Html data={ data } /></dfn>;

export default Dfn;