import React from 'react';
import Html from '../Html';

const Table = ({ data, attribs }) => <table {...attribs}><Html data={ data } /></table>;

export default Table;