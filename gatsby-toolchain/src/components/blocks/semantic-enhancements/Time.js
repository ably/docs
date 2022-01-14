import React from 'react';
import Html from '../Html';

const Time = ({ data, attribs }) => <time {...attribs}><Html data={ data } /></time>;

export default Time;