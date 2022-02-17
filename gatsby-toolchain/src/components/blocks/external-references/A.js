import { Link } from 'gatsby';
import React from 'react';
import Html from '../Html';
import GenericHtmlBlock from '../Html/GenericHtmlBlock';

const A = ({ data, attribs }) => {
    if(
        attribs.href &&
        /^(\/|#|https?:\/\/(?:www.)?ably.com\/documentation).*/.test(attribs.href)
    ) {
        return <Link {...{ ...attribs, to: attribs.href }}><Html data={ data } /></Link>
    }
    return GenericHtmlBlock('a')({ data, attribs });
}

export default A;