import React from 'react';
import Html from '../Html';

const P = ({ data, attribs }) => <p {...attribs}><Html data={ data } /></p>;

export default P;