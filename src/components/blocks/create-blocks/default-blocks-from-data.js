import React from 'react';
import { filterAttribsForReact } from '../../../react-utilities';
import { componentMap } from '../block-component-maps/component-map';
import Html from '../Html';

export const defaultBlocksFromData = (data) =>
  data.map(({ attribs, data, name }, i) => {
    const Block = componentMap(name) ?? Html;
    const filteredAttribs = filterAttribsForReact(attribs);
    return <Block key={i} attribs={filteredAttribs} data={data} />;
  });
