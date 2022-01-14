import React from 'react';
import Html from '../Html';

const Col = ({ data, attribs }) => <col {...attribs}><Html data={ data } /></col>;

export default Col;