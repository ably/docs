import React from 'react';
import Html from '.';

const GenericHtmlBlock = Type => ({ data, attribs }) => <Type {...attribs}><Html data={ data } /></Type>;

export default GenericHtmlBlock;
