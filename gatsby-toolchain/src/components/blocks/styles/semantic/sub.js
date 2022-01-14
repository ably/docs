import React from 'react';
import Html from '../../Html';

const Sub = ({ data, attribs }) => <sub {...attribs}><Html data={ data } /></sub>;

export default Sub;