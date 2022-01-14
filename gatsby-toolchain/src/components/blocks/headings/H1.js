import React from 'react';
import Html from '../Html';

const H1 = ({ data, attribs }) => <h1 {...attribs}><Html data={ data } /></h1>;

export default H1;