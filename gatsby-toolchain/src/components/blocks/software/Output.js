import React from 'react';
import Html from '../Html';

const Output = ({ data, attribs }) => <output {...attribs}><Html data={ data } /></output>;

export default Output;