import React from 'react';
import Html from '../Html';

const Dd = ({ data, attribs }) => <dd {...attribs}><Html data={ data } /></dd>;

export default Dd;