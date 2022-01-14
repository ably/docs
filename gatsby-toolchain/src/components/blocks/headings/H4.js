import React from 'react';
import Html from '../Html';

const H4 = ({ data, attribs }) => <h4 {...attribs}><Html data={ data } /></h4>;

export default H4;