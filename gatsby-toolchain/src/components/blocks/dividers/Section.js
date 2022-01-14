import React from 'react';
import Html from '../Html';

const Section = ({ data, attribs }) => <section {...attribs}><Html data={ data } /></section>;

export default Section;