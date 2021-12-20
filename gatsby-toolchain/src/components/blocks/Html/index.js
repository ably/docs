import React from 'react';
import DOMPurify from 'dompurify';

const Html = ({ html }) => <section dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html, {
    // The SVG and Math tags have been used in the past as attack vectors for mXSS,
    // but if we really need them should be safe enough to enable.
    // This is probably too cautious but we have no need for them at time of writing, so forbidding them is free.
    FORBID_TAGS: ['svg', 'math']
}) }}></section>;

export default Html;