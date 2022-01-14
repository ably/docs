import React from 'react';
import Html from '../Html';

const Td = ({ data, attribs }) => <td {...attribs}><Html data={ data } /></td>;

export default Td;