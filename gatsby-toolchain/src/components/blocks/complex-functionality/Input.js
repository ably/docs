import React from 'react';
import Html from '../Html';

const Input = ({ data, attribs }) => <input {...attribs}><Html data={ data } /></input>;

export default Input;