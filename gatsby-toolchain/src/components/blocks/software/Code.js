import React from 'react';
import Html from '../Html';

const Code = ({ data, attribs }) => <code {...attribs}><Html data={ data } /></code>;

export default Code;