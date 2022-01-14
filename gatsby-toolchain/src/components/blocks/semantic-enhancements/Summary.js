import React from 'react';
import Html from '../Html';

const Summary = ({ data, attribs }) => <summary {...attribs}><Html data={ data } /></summary>;

export default Summary;