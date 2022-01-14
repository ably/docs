import React from 'react';
import Html from '../Html';

const A = ({ data, attribs }) => <a {...attribs}><Html data={ data } /></a>;

export default A;