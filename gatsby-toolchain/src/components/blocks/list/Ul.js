import React from 'react';
import Html from '../Html';

const Ul = ({ data, attribs }) => <ul {...attribs}><Html data={ data } /></ul>;

export default Ul;