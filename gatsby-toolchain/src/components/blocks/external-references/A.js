import { Link } from 'gatsby';
import React from 'react';
import Html from '../Html';

const A = ({ data, attribs }) => {
    if(
        attribs.href &&
        /^(\/|#|https?:\/\/(?:www.)?ably.com\/documentation).*/.test(attribs.href)
    ) {
        return <Link {...{ ...attribs, to: attribs.href }}><Html data={ data } /></Link>
    }
    return <a {...attribs}><Html data={ data } /></a>;
}

export default A;