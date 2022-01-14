import React from 'react';
import Html from '../Html';

const Textarea = ({ data, attribs }) => <textarea {...attribs}><Html data={ data } /></textarea>;

export default Textarea;