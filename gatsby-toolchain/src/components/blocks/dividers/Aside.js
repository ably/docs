import React from 'react';
import Html from '../Html';

const Aside = ({ data, attribs }) => <aside {...attribs}><Html data={ data } /></aside>;

export default Aside;