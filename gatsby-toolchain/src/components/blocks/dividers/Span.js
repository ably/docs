import React from 'react';
import Html from '../Html';

const Span = ({ data, attribs }) => <span {...attribs}><Html data={ data } /></span>;

export default Span;