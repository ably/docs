import React from 'react';
import Html from '../Html';

const Dt = ({ data, attribs }) => <dt {...attribs}><Html data={ data } /></dt>;

export default Dt;