import React from 'react';
import Html from '../Html';

const Noscript = ({ data, attribs }) => <noscript {...attribs}><Html data={ data } /></noscript>;

export default Noscript;