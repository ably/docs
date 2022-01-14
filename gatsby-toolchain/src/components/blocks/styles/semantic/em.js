import React from 'react';
import Html from '../../Html';

const Em = ({ data, attribs }) => <em {...attribs}><Html data={ data } /></em>;

export default Em;