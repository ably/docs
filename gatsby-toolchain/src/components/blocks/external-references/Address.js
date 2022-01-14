import React from 'react';
import Html from '../Html';

const Address = ({ data, attribs }) => <address {...attribs}><Html data={ data } /></address>;

export default Address;