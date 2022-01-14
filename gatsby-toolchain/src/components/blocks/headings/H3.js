import React from 'react';
import Html from '../Html';

const H3 = ({ data, attribs }) => <h3 {...attribs}><Html data={ data } /></h3>;

export default H3;