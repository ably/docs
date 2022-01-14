import React from 'react';
import Html from '../Html';

const Meter = ({ data, attribs }) => <meter {...attribs}><Html data={ data } /></meter>;

export default Meter;