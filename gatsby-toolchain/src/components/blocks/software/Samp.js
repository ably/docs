import React from 'react';
import Html from '../Html';

const Samp = ({ data, attribs }) => <samp {...attribs}><Html data={ data } /></samp>;

export default Samp;