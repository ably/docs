import React from 'react';
import Html from '../Html';

const Select = ({ data, attribs }) => <select {...attribs}><Html data={ data } /></select>;

export default Select;