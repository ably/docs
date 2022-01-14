import React from 'react';
import Html from '../Html';

const Article = ({ data, attribs }) => <article {...attribs}><Html data={ data } /></article>;

export default Article;