import React from 'react';
import Html from '../Html';

const Var = ({ data, attribs }) => <var {...attribs}><Html data={ data } /></var>;

export default Var;