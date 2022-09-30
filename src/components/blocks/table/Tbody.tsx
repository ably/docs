import React from 'react';
import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from 'src/components/blocks/Html';
import HtmlDataTypes from '../../../../data/types/html';

const Tbody = ({ data, attribs }: HtmlComponentProps<'tbody'>) => {
  if (!data || typeof data === 'string') {
    return null;
  }

  return (
    <tbody {...attribs}>
      <Html data={data.filter((item) => item.type === HtmlDataTypes.tag)} />
    </tbody>
  );
};

export default Tbody;
