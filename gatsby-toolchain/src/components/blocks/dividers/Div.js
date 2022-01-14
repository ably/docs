import React from 'react';
import Html from '../Html';

const Div = ({ data, attribs }) => <div {...attribs}><Html data={ data } /></div>;

export default Div;