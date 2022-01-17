import React from 'react';
import Html from '../Html';

const Paragraph = ({ data, attribs }) => <p {...attribs}><Html data={ data } /></p>;

export default Paragraph;