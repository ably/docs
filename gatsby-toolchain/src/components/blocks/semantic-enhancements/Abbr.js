import React from 'react';
import Html from '../Html';

const Abbr = ({ data, attribs }) => <abbr {...attribs}><Html data={ data } /></abbr>;

export default Abbr;