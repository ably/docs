import React from 'react';
import { filterAttribsForReact } from '../../react-utilities';
import { apiReferenceComponentMap } from '../component-map';
import Html from './Html';

const apiReferenceBlocksFromData = (data) =>
  data.map(({ attribs, data, name }, i) => {
    const Block = apiReferenceComponentMap(name) ?? Html;
    const filteredAttribs = filterAttribsForReact(attribs);
    return <Block key={i} attribs={filteredAttribs} data={data} />;
  });

export default apiReferenceBlocksFromData;
