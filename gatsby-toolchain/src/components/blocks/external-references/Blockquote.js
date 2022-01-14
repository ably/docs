import React from 'react';
import Html from '../Html';

const Blockquote = ({ data, attribs }) => <blockquote {...attribs}><Html data={ data } /></blockquote>;

export default Blockquote;