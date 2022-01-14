import React from 'react';
import Html from '../../Html';

const Small = ({ data, attribs }) => <small {...attribs}><Html data={ data } /></small>;

export default Small;