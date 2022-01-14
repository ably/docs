import React from 'react';
import Html from '../Html';

const Caption = ({ data, attribs }) => <caption {...attribs}><Html data={ data } /></caption>;

export default Caption;