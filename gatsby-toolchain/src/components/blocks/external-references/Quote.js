import React from 'react';
import Html from '../Html';

const Quote = ({ data, attribs }) => <q {...attribs}><Html data={ data } /></q>;

export default Quote;