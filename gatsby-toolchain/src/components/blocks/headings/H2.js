import React from 'react';
import Html from '../Html';

const H2 = ({ data, attribs }) => <h2 {...attribs}><Html data={ data } /></h2>;

export default H2;