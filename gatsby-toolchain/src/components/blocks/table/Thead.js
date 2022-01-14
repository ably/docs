import React from 'react';
import Html from '../Html';

const Thead = ({ data, attribs }) => <thead {...attribs}><Html data={ data } /></thead>;

export default Thead;