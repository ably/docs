import React from 'react';
import Html from '../Html';

const Audio = ({ data, attribs }) => <audio {...attribs}><Html data={ data } /></audio>;

export default Audio;