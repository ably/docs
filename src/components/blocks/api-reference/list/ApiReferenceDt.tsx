import React from 'react';
import { ensureChildDataShows } from 'src/clientside-data-utilities';
import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from '../../Html';

const ApiReferenceDt = ({ data, attribs }: HtmlComponentProps<'dt'>) => {
  const alwaysShowChildData = ensureChildDataShows(data);

  return (
    <dt {...attribs}>
      <Html data={alwaysShowChildData} />
    </dt>
  );
};

export default ApiReferenceDt;
