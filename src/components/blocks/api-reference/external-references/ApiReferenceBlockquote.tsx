import React, { ComponentProps, ReactNode } from 'react';
import { HtmlComponentProps } from '../../../html-component-props';
import { Blockquote } from '../../external-references';
import Html from '../../Html';

const StyledApiReferenceBlockquote = ({
  attribs,
  children,
}: {
  attribs: ComponentProps<'blockquote'>;
  children: ReactNode;
}) => (
  <blockquote {...{ ...attribs }} className="bg-extra-light-grey border border-mid-grey rounded-md p-16 mb-32">
    {children}
  </blockquote>
);

export const ApiReferenceBlockquote = ({ data, attribs }: HtmlComponentProps<'blockquote'>) => {
  if (attribs?.className && attribs.className.includes('definition')) {
    return (
      <StyledApiReferenceBlockquote attribs={attribs}>
        <Html data={data} />
      </StyledApiReferenceBlockquote>
    );
  }
  return <Blockquote data={data} attribs={attribs} />;
};
