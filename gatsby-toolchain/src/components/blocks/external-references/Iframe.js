import React from 'react';
import Html from '../Html';

const Iframe = ({ data, attribs }) => <iframe {...attribs}><Html data={ data } /></iframe>;

export default Iframe;