import React from 'react';
import { HtmlComponentProps } from 'src/components/html-component-props';
import Html from 'src/components/blocks/Html';
import Blockquote from 'src/components/blocks/external-references/Blockquote';
import { DlWrapper } from 'src/components/blocks/list/Dl/DlWrapper';

export const ApiReferenceBlockquote = ({ data, attribs }: HtmlComponentProps<'blockquote'>) => {
  if (attribs?.className && attribs.className.includes('definition')) {
    return (
      <blockquote {...attribs} className="bg-extra-light-grey border border-mid-grey rounded-md p-16 mb-32">
        <Html data={data} BlockWrapper={DlWrapper} />
      </blockquote>
    );
  }
  return <Blockquote data={data} attribs={attribs} />;
};
