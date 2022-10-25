import React from 'react';
import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from 'src/components/blocks/Html';

const Blockquote = ({ data, attribs }: HtmlComponentProps<'blockquote'>) => {
  return (
    <blockquote {...attribs}>
      <Html data={data} />
    </blockquote>
  );
};

export default Blockquote;
