import React from 'react';
import NullComponent from '../../NullComponent';
import { Script } from 'gatsby';
import { isString } from 'lodash/fp';

const MaybeScript = ({
  attribs,
}: {
  attribs: {
    src: string;
    crossorigin?: string;
    onLoad?: (event: Event) => void;
    onError?: (event: Event) => void;
  };
}) => {
  if (attribs.src && isString(attribs.src)) {
    return (
      <Script src={attribs.src} crossOrigin={attribs.crossorigin} onLoad={attribs.onLoad} onError={attribs.onError} />
    );
  }
  return <NullComponent />;
};

export default MaybeScript;
