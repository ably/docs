import React from 'react';
import Html from '../Html';

const Colgroup = ({ data, attribs }) => <colgroup {...attribs}><Html data={ data } /></colgroup>;

export default Colgroup;