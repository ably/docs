import React from 'react';
import DOMPurify from 'dompurify';

const Html = ({ html }) => <section dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html) }}></section>;

export default Html;