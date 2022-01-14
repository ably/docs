import React from 'react';
import Html from '../Html';

const Progress = ({ data, attribs }) => <progress {...attribs}><Html data={ data } /></progress>;

export default Progress;