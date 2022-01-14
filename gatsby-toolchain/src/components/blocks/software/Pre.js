import React from 'react';
import Html from '../Html';

const Pre = ({ data, attribs }) => <pre {...attribs}><Html data={ data } /></pre>;

export default Pre;