import React from 'react';
import Html from '../Html';

const Tr = ({ data, attribs }) => <tr {...attribs}><Html data={ data } /></tr>;

export default Tr;