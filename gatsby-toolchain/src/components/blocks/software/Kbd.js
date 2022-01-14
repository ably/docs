import React from 'react';
import Html from '../Html';

const Kbd = ({ data, attribs }) => <kbd {...attribs}><Html data={ data } /></kbd>;

export default Kbd;