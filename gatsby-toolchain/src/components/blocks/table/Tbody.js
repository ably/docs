import React from 'react';
import Html from '../Html';

const Tbody = ({ data, attribs }) => <tbody {...attribs}><Html data={ data } /></tbody>;

export default Tbody;