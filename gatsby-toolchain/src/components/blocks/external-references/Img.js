import React from 'react';
import Html from '../Html';

const Img = ({ data, attribs }) => <img {...attribs}><Html data={ data } /></img>;

export default Img;