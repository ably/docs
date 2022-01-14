import React from 'react';
import Html from '../Html';

const Button = ({ data, attribs }) => <button {...attribs}><Html data={ data } /></button>;

export default Button;