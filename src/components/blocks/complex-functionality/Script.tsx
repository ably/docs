import React from 'react';
import { Script } from 'gatsby';
import { isString } from 'lodash/fp';

type CrossOrigin = 'anonymous' | 'use-credentials' | '' | undefined;

const MaybeScript = ({
  attribs,
}: {
  attribs: {
    src: string;
    crossorigin?: CrossOrigin;
    onLoad?: (event: Event) => void;
    onError?: (event: Event) => void;
  };
}) =>
  attribs.src && isString(attribs.src) ? (
    <Script src={attribs.src} crossOrigin={attribs.crossorigin} onLoad={attribs.onLoad} onError={attribs.onError} />
  ) : null;

export default MaybeScript;
