import React from 'react';
import Html from '../Html';

const Details = ({ data, attribs }) => <details {...attribs}><Html data={ data } /></details>;

export default Details;