import React from 'react';
import Html from '../Html';

const Video = ({ data, attribs }) => <video {...attribs}><Html data={ data } /></video>;

export default Video;