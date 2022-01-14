import React from 'react';
import Html from '../Html';

const Dl = ({ data, attribs }) => <dl {...attribs}><Html data={ data } /></dl>;

export default Dl;