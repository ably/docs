import React from 'react';
import Html from '../../Html';

const Strong = ({ data, attribs }) => <strong {...attribs}><Html data={ data } /></strong>;

export default Strong;