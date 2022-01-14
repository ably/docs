import React from 'react';
import Html from '../Html';

const Main = ({ data, attribs }) => <main {...attribs}><Html data={ data } /></main>;

export default Main;