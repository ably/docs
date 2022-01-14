import React from 'react';
import Html from '../../Html';

const Sup = ({ data, attribs }) => <sup {...attribs}><Html data={ data } /></sup>;

export default Sup;