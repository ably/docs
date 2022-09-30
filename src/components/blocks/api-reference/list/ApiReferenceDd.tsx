import React from 'react';
import { ensureChildDataShows } from 'src/clientside-data-utilities';
import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from '../../Html';

const ApiReferenceDd = ({ data, attribs }: HtmlComponentProps<'dd'>) => {
  const alwaysShowChildData = ensureChildDataShows(data);

  return (
    <dd {...attribs}>
      <Html data={alwaysShowChildData} />
    </dd>
  );
};

export default ApiReferenceDd;
