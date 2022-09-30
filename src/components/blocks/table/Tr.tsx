import React from 'react';
import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from 'src/components/blocks/Html';
import HtmlDataTypes from '../../../../data/types/html';

const Tr = ({ data, attribs }: HtmlComponentProps<'tr'>) => {
  if (!data || typeof data === 'string') {
    return null;
  }
  return (
    <tr className="border-b border-light-grey" {...attribs}>
      <Html data={data.filter((item) => item.type === HtmlDataTypes.tag)} />
    </tr>
  );
};

export default Tr;
