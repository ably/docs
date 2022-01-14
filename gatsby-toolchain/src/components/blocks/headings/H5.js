import React from 'react';
import Html from '../Html';

const H5 = ({ data, attribs }) => <h5 {...attribs}><Html data={ data } /></h5>;

export default H5;